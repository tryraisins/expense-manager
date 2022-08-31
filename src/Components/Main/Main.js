import React, { useMemo, useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Main.css";
import data from "../../assets/MOCK_DATA.json";
import receipt from "../../assets/receipt.png";

//MAIN  TABLE COMPONENT

const filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    const dateAsString = cellValue;
    const dateParts = dateAsString.split("/");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  },
};

const FormDataTemplate = Object.freeze({});

const Main = ({ modal, ToggleModal }) => {
  const gridRef = useRef();

  //TABLE DATA STATE

  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState();

  //MODAL STATES
  const [addRowModal, setAddRowModal] = useState(false);
  const openAddRowModal = () => {
    setAddRowModal(true);
  };
  const closeAddRowModal = () => {
    setAddRowModal(false);
  };

  const [onRowSelectModal, setOnRowSelectModal] = useState(false);
  const openOnRowSelectModal = () => {
    setOnRowSelectModal(true);
  };
  const closeOnRowSelectModal = () => {
    setOnRowSelectModal(false);
  };

  //ONSELECTEDROW DATA STATES
  const [selectedRow, setSelectedRow] = useState();
  const [dateData, setDateData] = useState();
  const [merchantData, setMerchantData] = useState();
  const [totalData, setTotalData] = useState();
  const [paymentMethodData, setPaymentMethodData] = useState();
  const [frequencyData, setFrequencyData] = useState();
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(receipt);
  const [onRowClickedState, setOnRowClickedState] = useState(false);
  const [rowID, setRowID] = useState();

  //FORM DATA STATE
  const [newRow, setNewRow] = useState(false);
  const [formData, updateFormData] = useState(FormDataTemplate);
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };

  //FORM SUBMIT EVENT

  const handleSubmit = (event) => {
    event.preventDefault();

    data.push(formData);

    updateFormData(FormDataTemplate);
    if (newRow === false) {
      setNewRow(true);
    } else {
      setNewRow(false);
    }

    closeAddRowModal();
  };

  const getResult = () => {
    const getInfo = data.map((arr, i) => {
      if (arr.Frequency === "Never") {
        let num = arr.Total;
        num = Number(num.replace("$", ""));

        return num;
      } else {
        return 0;
      }
    });
    return getInfo;
  };
  const answer = getResult().reduce((init, current) => {
    return init + current;
  });
  const columnDefs = [
    {
      field: "Date",
      minWidth: 140,
      filter: "agDateColumnFilter",
      filterParams: filterParams,
      pinned: "left",
    },
    { field: "Merchant" },
    { field: "Total", filter: "agNumberColumnFilter" },
    { field: "Payment Method", minWidth: 200 },
    { field: "Frequency" },
  ];

  const defaultColDef = useMemo(() => {
    return {
      editable: false,
      sortable: true,
      flex: 1,
      minWidth: 120,
      filter: true,
      floatingFilter: false,
      resizable: true,
      suppressNavigable: true,
      cellClass: "no-border",
    };
  }, []);

  const onGridReady = (params) => {
    const firstData = data.map((obj, i) => {
      return { id: i, ...obj };
    });
    setRowData(firstData);
    setGridApi(params.api);
  };
  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);

  useEffect(() => {
    const firstData = data.map((obj, i) => {
      return { id: i, ...obj };
    });
    setRowData(firstData);
  }, [newRow]);
  useEffect(() => {
    if (imageData) {
      setImageUrl(URL.createObjectURL(imageData));
      const newData = rowData;
      newData[rowID].Image = imageUrl;
      setRowData(newData);
      setImageData(null);
    }
  }, [imageData, selectedRow, imageUrl, rowID, rowData]);
  useEffect(() => {
    setImageUrl(receipt);
  }, [onRowClickedState]);

  const getSelectedRowData = () => {
    setSelectedRow(gridApi.getSelectedRows()[0]);

    setMerchantData(selectedRow.Merchant);
    setTotalData(selectedRow.Total);
    setDateData(selectedRow.Date);
    setPaymentMethodData(selectedRow["Payment Method"]);
    setFrequencyData(selectedRow.Frequency);
    setImageUrl(selectedRow.Image);
    setRowID(selectedRow.id * 1);
  };

  const onRowClicked = () => {
    getSelectedRowData();
    openOnRowSelectModal();
    if (onRowClickedState) {
      setOnRowClickedState(false);
    } else {
      setOnRowClickedState(true);
    }
  };
  return (
    <div>
      <div className='fl w-100  pa2 bg-light-gray tc   bb b--black-20 '>
        <h3 className='pa1'>
          Sum of Totals with Frequency: Never (This feature is equivalent to the
          reimbursement sum feature in the sample page)
        </h3>
        <h4>${Intl.NumberFormat("en-US").format(answer.toFixed(2))}</h4>
      </div>
      <div className='scrollborder fl bg-white' id='style-1'>
        <div className='bg-white center h-100 w-100 tc relative'>
          <div
            className='pa2 fixed bottom-0 right-2 z-9999 dn db-l'
            onClick={openAddRowModal}
          >
            <p className='f3  dim pa3 mb2 dib white bg-red br-100 pointer'>
              <i className='fa-solid fa-plus' />
            </p>
          </div>
          <div
            className='ag-theme-alpine center tc'
            style={{ width: "100%", height: "100%" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              ref={gridRef}
              rowSelection={"single"}
              onRowClicked={onRowClicked}
              onGridReady={onGridReady}
              animateRows={true}
              getRowId={getRowId}
            ></AgGridReact>
          </div>
        </div>
      </div>
      {/* Modals */}
      {/* ADD ROW MODAL */}
      {addRowModal && (
        <>
          <div className='overlay' />
          <div className='addrowmodal '>
            <header className='flex justify-around'>
              <h2 className=' center '>ADD DATA</h2>
              <button onClick={closeAddRowModal} className='close-button  '>
                &times;
              </button>
            </header>
            <main className='modal__main center'>
              <form className='pa4 black-80 center'>
                {/* DATE */}
                <div className='measure center  mb4'>
                  <label htmlFor='date' className='f6 b  db mb2'>
                    DATE
                  </label>
                  <input
                    id='date'
                    className='input-reset ba b--black-20 pa2 mb2 db w-100'
                    type='date'
                    aria-describedby='name-desc'
                    onChange={handleChange}
                    name='Date'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Add date of Transaction here
                  </small>
                </div>
                {/* MERCHANT */}
                <div className='measure  center mb4'>
                  <label htmlFor='merchant' className='f6 b db mb2'>
                    MERCHANT
                  </label>
                  <input
                    id='merchant'
                    className='input-reset ba b--black-20 pa2 h2 mb2 db w-100'
                    type='text'
                    aria-describedby='name-desc'
                    onChange={handleChange}
                    name='Merchant'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Enter name of Merchant here
                  </small>
                </div>

                {/* TOTAL */}
                <div className='measure center mb4'>
                  <label htmlFor='total' className='f6 b db mb2'>
                    TOTAL{" "}
                    <span className='normal black-60 b'> (In Dollars)</span>
                  </label>

                  <input
                    type='number'
                    prefix='$'
                    onChange={handleChange}
                    className='input-reset ba b--black-20 pa2 mb2 db w-100'
                    name='Total'
                    id='total'
                    placeholder='$0.00'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Enter Amount Spent Here
                  </small>
                </div>

                {/* PAYMENT METHOD */}
                <div className='measure center mb4'>
                  <label htmlFor='payment-method' className='f6 b db mb2'>
                    PAYMENT METHOD{" "}
                  </label>
                  <input
                    id='payment-method'
                    className='input-reset ba b--black-20 pa2 mb2 db w-100'
                    type='text'
                    aria-describedby='name-desc'
                    onChange={handleChange}
                    name='Payment Method'
                  />
                  <small id='name-desc' className='f6 black-60 db mb2 '>
                    Enter Credit Card Type
                  </small>
                </div>

                {/* FREQUENCY */}
                <div className='measure center '>
                  <label htmlFor='frequency' className='f6 b  db mb2'>
                    FREQUENCY
                  </label>
                  <select
                    id='frequency'
                    name='Frequency'
                    className='pa2 w-100 mb2'
                    onChange={handleChange}
                  >
                    <option value=''></option>
                    <option value='Daily'>Daily</option>
                    <option value='Monthly'>Monthly</option>
                    <option value='Never' default={true}>
                      Never
                    </option>
                    <option value='Often'>Often</option>
                    <option value='Once'>Once</option>
                    <option value='Seldom'>Seldom</option>
                    <option value='Weekly'>Weekly</option>
                    <option value='Yearly'>Yearly</option>
                  </select>

                  <small id='name-desc' className='f6 black-60 db mb2'>
                    Select Frequency of Transaction Here
                  </small>
                </div>

                {/* Add Button */}
                <div className=' flex  mt3 center'>
                  <input
                    className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 tc center'
                    type='submit'
                    value='ADD DATA'
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            </main>
          </div>
        </>
      )}
      {/* ON ROW SELECT MODAL */}
      {onRowSelectModal && (
        <>
          <div className='overlay  dn db-l'></div>
          <div className='rowselectmodal  ph2 dn di-l'>
            <main className=' db min-h-100 center '>
              <article className=' db min-h-100 '>
                <div class='fl di pl3 w-50'>
                  <h2>EXPENSES</h2>
                  <ul class='list  black-50 pl0'>
                    <li class='pa3  '>
                      <b class='db f5 mb1 '>Merchant</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {merchantData}
                      </span>
                    </li>
                    <li class='pa3 '>
                      <b class='db f5 mb1'>Total</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {totalData}
                      </span>
                    </li>
                    <li class='pa3 '>
                      <b class='db f5 mb1 '>Date</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {dateData}
                      </span>
                    </li>
                    <li class='pa3 '>
                      <b class='db f5 mb1 '>Payment Method</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {paymentMethodData}
                      </span>
                    </li>
                    <li class='pa3 '>
                      <b class='db f5 mb1 '>Frequency</b>
                      <span className='f5 db pv1 ph2 lh-copy measure ba b--dashed b--black-30'>
                        {frequencyData}
                      </span>
                    </li>

                    <li class='pa3 '>
                      <div class='measure'>
                        <label for='name' class='f6 b db mb2'>
                          Comments
                        </label>
                        <input
                          id='name'
                          class='input-reset ba b--black-20 pa2 mb2 h3 db w-100'
                          type='text'
                          aria-describedby='name-desc'
                        />
                      </div>
                    </li>

                    <li class='fl  pa1 w-100 justify-between'>
                      <p class='f5 fl b  link dim br3 ph3 pv2   dib white bg-blue'>
                        Save
                      </p>
                      <p
                        class='f5 fr b link dim br3 ph3 pv2  dib blue bg-light-gray pointer'
                        onClick={closeOnRowSelectModal}
                      >
                        Cancel
                      </p>
                    </li>
                  </ul>
                </div>
                <div class='fl di w-50  pa2 ma1  br2 ba  b--dashed b--black-30  center '>
                  <article class='  overflow-auto dark-gray min-w-100 '>
                    <div className=' h-25'>
                      <div class='flex mt1'>
                        <input
                          accept='image/*'
                          type='file'
                          id='select-image'
                          className='dn'
                          onChange={(e) => setImageData(e.target.files[0])}
                        />
                        <label htmlFor='select-image' className='center'>
                          <p className='f6 dim link br-pill ph3 pv2 mb2 dib white bg-blue'>
                            Select Receipt
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className=''>
                      <p className='f4 b'>Receipt:</p>
                      <img
                        src={imageUrl}
                        className='  br2  br--top'
                        alt='Receipt'
                      />
                    </div>
                  </article>
                </div>
              </article>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
