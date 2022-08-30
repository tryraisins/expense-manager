import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Main.css";
import data from "../../assets/MOCK_DATA.json";
import CurrencyInput from "react-currency-input-field";

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

const Main = ({ modal, ToggleModal }) => {
  //CURRENCY INPUT IN TOTAL

  //TABLE DATA
  const [rowData, setRowData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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
    };
  }, []);

  const onGridReady = () => {
    setRowData(data);
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
        {/* Modal */}
        {isOpen && (
          <>
            <div className='overlay' />
            <div className='modal '>
              <header className='flex justify-around'>
                <h2 className=' center '>ADD DATA</h2>
                <button onClick={closeModal} className='close-button  '>
                  &times;
                </button>
              </header>
              <main className='modal__main'>
                <form className='pa4 black-80'>
                  {/* DATE */}
                  <div className='measure  mb4'>
                    <label for='date' className='f6 b db mb2'>
                      Date
                    </label>
                    <input
                      id='date'
                      className='input-reset ba b--black-20 pa2 mb2 db w-100'
                      type='date'
                      aria-describedby='name-desc'
                    />
                    <small id='name-desc' className='f6 black-60 db mb2'>
                      Add date of Transaction here
                    </small>
                  </div>
                  {/* MERCHANT */}
                  <div className='measure  mb4'>
                    <label for='merchant' className='f6 b db mb2'>
                      Merchant
                    </label>
                    <input
                      id='merchant'
                      className='input-reset ba b--black-20 pa2 mb2 db w-100'
                      type='text'
                      aria-describedby='name-desc'
                    />
                    <small id='name-desc' className='f6 black-60 db mb2'>
                      Enter name of Merchant here
                    </small>
                  </div>

                  {/* TOTAL */}
                  <div className='measure  mb4'>
                    <label htmlFor='total' className='f6 b db mb2'>
                      Total <span class='normal black-60 b'> (In Dollars)</span>
                    </label>
                    <CurrencyInput
                      id='total'
                      placeholder='$0.00'
                      allowDecimals={true}
                      decimalsLimit={2}
                      prefix='$'
                      onValueChange={(value, name) => console.log(value, name)}
                      className='input-reset ba b--black-20 pa2 mb2 db w-100'
                    />

                    <small id='name-desc' className='f6 black-60 db mb2'>
                      Enter Amount Spent Here
                    </small>
                  </div>

                  {/* PAYMENT METHOD */}
                  <div className='measure mb4'>
                    <label for='payment-method' className='f6 b db mb2'>
                      Payment Method{" "}
                    </label>
                    <input
                      id='payment-method'
                      className='input-reset ba b--black-20 pa2 mb2 db w-100'
                      type='text'
                      aria-describedby='name-desc'
                    />
                    <small id='name-desc' className='f6 black-60 db mb2 '>
                      Enter Credit Card Type
                    </small>
                  </div>

                  {/* FREQUENCY */}
                  <div className='measure'>
                    <label for='frequency' className='f6 b db mb2'>
                      Frequency
                    </label>
                    <select id='frequency' name='frequency' className='pa2 mb2'>
                      <option value='Daily'>Daily</option>
                      <option value='Monthly'>Monthly</option>
                      <option value='Never'>Never</option>
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
                  <div class='mt3'>
                    <input
                      class='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 center'
                      type='submit'
                      value='Add Data'
                    />
                  </div>
                </form>
              </main>
            </div>
          </>
        )}

        <div className='bg-white center h-100 w-100 tc relative'>
          <div
            className='pa2 absolute bottom-0 right-2 z-9999'
            onClick={openModal}
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
              onGridReady={onGridReady}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
