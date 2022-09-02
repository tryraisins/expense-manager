import React, { useMemo, useState, useRef, useEffect } from "react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Main.css";
import data from "../../assets/MOCK_DATA.json";
import receipt from "../../assets/receipt.png";
import AddRowModal from "../AddRowModal/AddRowModal";
import RowSelectModal from "../RowSelectModal/RowSelectModal";
import Table from "../Table/Table";

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

const FormDataTemplate = {};

const Main = ({ modal, ToggleModal }) => {
  const gridRef = useRef();

  //TABLE DATA STATE

  const [rowData, setRowData] = useState(data);
  const [gridApi, setGridApi] = useState();

  //ADDMODAL STATES
  const [addRowModal, setAddRowModal] = useState(false);

  const openAddRowModal = () => {
    setAddRowModal(true);
  };
  const closeAddRowModal = () => {
    setAddRowModal(false);
  };
  //OnRowSelect Modal States
  const [onRowSelectModal, setOnRowSelectModal] = useState(false);

  const openOnRowSelectModal = () => {
    onSelectionChanged();
    setOnRowSelectModal(true);
  };
  const closeOnRowSelectModal = () => {
    setOnRowSelectModal(false);
    setOnRowClickedState(false);
  };

  //ONSELECTEDROW DATA STATES

  const [dateData, setDateData] = useState();
  const [merchantData, setMerchantData] = useState();
  const [totalData, setTotalData] = useState();
  const [paymentMethodData, setPaymentMethodData] = useState();
  const [frequencyData, setFrequencyData] = useState();
  const [commentsData, setCommentsData] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [onRowClickedState, setOnRowClickedState] = useState(false);
  const [rowID, setRowID] = useState();
  const [saved, setSaved] = useState(false);
  const [newCommentsData, setNewCommentsData] = useState(null);

  const [newRowData, setNewRowData] = useState(false);

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

    if (newRow) {
      setNewRow(false);
    } else {
      setNewRow(true);
    }

    closeAddRowModal();
  };

  const getResult = () => {
    const getInfo = rowData.map((arr, i) => {
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
  function formatNumber(number) {
    number = Number(number.replace("$", ""));
    number = number.toFixed(2);
    console.log("1 " + number);
    number = number.toString();
    number = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log("2 " + number);

    return number;
  }
  function currencyFormatter(params) {
    return "$" + formatNumber(params.value);
  }

  const columnDefs = [
    {
      field: "Date",
      minWidth: 120,
      filter: "agDateColumnFilter",
      filterParams: filterParams,
      pinned: "left",
    },
    { field: "Merchant" },
    {
      field: "Total",

      valueFormatter: currencyFormatter,
    },
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
      resizable: true,
      suppressNavigable: true,
      cellClass: "no-border",
      suppressMovable: true,
      floatingFilter: true,
      suppressMenu: true,
      unSortIcon: true,
    };
  }, []);

  const onGridReady = (params) => {
    const firstData = data.map((obj, i) => {
      return { id: i, Image: receipt, Comments: "", ...obj };
    });
    setRowData(firstData);
    setGridApi(params.api);
  };
  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);

  useEffect(() => {
    if (newRow && Object.keys(formData).length) {
      const newData = rowData.map((obj) => obj);
      formData.id = newData.length + 1;
      formData.Image = receipt;
      // formData.Total = formData.Total.toString();
      formData.Comments = "";
      newData.push(formData);
      setRowData(newData);

      updateFormData(FormDataTemplate);
      setNewRow(false);
    }
  }, [newRow, imageUrl, getRowId, formData, rowData]);
  useEffect(() => {
    if (imageData) {
      setImageUrl(URL.createObjectURL(imageData));
      setNewRowData(true);
      setImageData(null);
    }
  }, [imageData]);
  useEffect(() => {
    if (saved && rowID && imageUrl && onRowClickedState) {
      const newData = rowData.map((obj) => obj);
      newData[rowID].Image = imageUrl;
      setRowData(newData);
      setSaved(false);
      closeOnRowSelectModal();
    }

    if (saved && rowID && newCommentsData && onRowClickedState) {
      const newData = rowData.map((obj) => obj);
      newData[rowID].Comments = newCommentsData;
      setRowData(newData);
      setSaved(false);
      closeOnRowSelectModal();
    }
  }, [saved, rowID, imageUrl, newCommentsData, rowData, onRowClickedState]);

  // useEffect(() => {
  //   if (onRowClickedState) {

  //   }
  // }, [onRowClickedState]);

  const onSelectionChanged = () => {
    const selectedRow = gridApi.getSelectedRows()[0];

    setMerchantData(selectedRow.Merchant);
    setTotalData(selectedRow.Total);
    setDateData(selectedRow.Date);
    setPaymentMethodData(selectedRow["Payment Method"]);
    setFrequencyData(selectedRow.Frequency);
    setCommentsData(selectedRow.Comments);
    setImageUrl(selectedRow.Image);
    setRowID(selectedRow.id * 1);
  };

  const onRowClicked = () => {
    openOnRowSelectModal();
    setOnRowClickedState(true);
  };
  const saveImage = () => {
    if (newRowData) {
      setSaved(true);
      setNewRowData(false);
    }
  };
  return (
    <>
      <Table
        gridRef={gridRef}
        openAddRowModal={openAddRowModal}
        answer={answer}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onRowClicked={onRowClicked}
        rowData={rowData}
        getRowId={getRowId}
        onSelectionChanged={onSelectionChanged}
      />
      <AddRowModal
        addRowModal={addRowModal}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        closeAddRowModal={closeAddRowModal}
      />
      <RowSelectModal
        onRowSelectModal={onRowSelectModal}
        dateData={dateData}
        merchantData={merchantData}
        totalData={totalData}
        paymentMethodData={paymentMethodData}
        frequencyData={frequencyData}
        commentsData={commentsData}
        setNewCommentsData={setNewCommentsData}
        saveImage={saveImage}
        setNewRowData={setNewRowData}
        closeOnRowSelectModal={closeOnRowSelectModal}
        setImageData={setImageData}
        imageUrl={imageUrl}
      />
    </>
  );
};

export default Main;
