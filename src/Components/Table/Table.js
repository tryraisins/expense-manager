import { AgGridReact } from "ag-grid-react";
import "./Table.css";
import AddRowButton from "../AddRowButton/AddRowButton";

const Table = ({
  gridRef,
  openAddRowModal,
  answer,
  columnDefs,
  defaultColDef,
  onGridReady,
  onSelectionChanged,
  rowData,
  getRowId,
  onRowClicked,
}) => {
  return (
    <div>
      <div className='w-100  pa2 bg-light-gray tc   bb b--black-20 answer '>
        <h3 className='pa0'>Sum of Totals with Frequency: Never</h3>
        <h4>${Intl.NumberFormat("en-US").format(answer.toFixed(2))}</h4>
      </div>

      <div className='bg-light-gray center w-100 tc relative table ma0'>
        <AddRowButton openAddRowModal={openAddRowModal} />
        <div
          className='ag-theme-alpine
          center tc'
          style={{ width: "100%", height: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            ref={gridRef}
            rowSelection={"single"}
            onRowClicked={onRowClicked}
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            animateRows={true}
            getRowId={getRowId}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default Table;
