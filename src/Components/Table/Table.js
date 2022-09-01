import { AgGridReact } from "ag-grid-react";
import Scroll from "../Scroll/Scroll";
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
      <div className='fl w-100  pa2 bg-light-gray tc   bb b--black-20 '>
        <h3 className='pa1'>Sum of Totals with Frequency: Never</h3>
        <h4>${Intl.NumberFormat("en-US").format(answer.toFixed(2))}</h4>
      </div>
      <Scroll>
        <div className='bg-white center h-100 w-100 tc relative'>
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
      </Scroll>
    </div>
  );
};

export default Table;
