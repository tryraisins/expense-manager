import { AgGridReact } from "ag-grid-react";

const Table = ({
  gridRef,
  openAddRowModal,
  answer,
  columnDefs,
  defaultColDef,
  onGridReady,
  onRowDoubleClicked,
  rowData,
  getRowId,
  onRowClicked,
}) => {
  return (
    <div>
      <div className='fl w-100  pa2 bg-light-gray tc   bb b--black-20 '>
        <h3 className='pa1'>Sum of Totals with Frequency: Never</h3>
        <h4>${Intl.NumberFormat("en-US").format(answer.toFixed(2))}</h4>
      </div>
      <div className='scrollborder fl bg-white' id='style-1'>
        <div className='bg-white center h-100 w-100 tc relative'>
          <div
            className='pa2 fixed bottom-0 right-2 z-9999  db'
            onClick={openAddRowModal}
          >
            <p className='f3  dim pa3 mb2 dib white bg-red br-100 pointer'>
              <i className='fa-solid fa-plus' />
            </p>
          </div>
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
              onRowDoubleClicked={onRowDoubleClicked}
              onRowClicked={onRowClicked}
              onGridReady={onGridReady}
              animateRows={true}
              getRowId={getRowId}
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
