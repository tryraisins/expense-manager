import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./Main.css";

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

const Main = () => {
  const [rowData, setRowData] = useState();
  const data = require("../../assets/MOCK_DATA.json");
  const columnDefs = [
    {
      field: "date",
      minWidth: 170,
      filter: "agDateColumnFilter",
      filterParams: filterParams,
    },
    { field: "Merchant" },
    { field: "Total", filter: "agNumberColumnFilter" },
    { field: "Payment Type" },
    { field: "Frequency" },
  ];
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
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
    <div className='bg-white center h-100 w-100 tc '>
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
  );
};

export default Main;
