import React from "react";

const AddRowButton = ({ openAddRowModal }) => {
  return (
    <div
      className='pa2 fixed bottom-0 right-2 z-9999 '
      onClick={openAddRowModal}
    >
      <p className='f3  dim pa3 mb2 dib white bg-red br-100 pointer'>
        <i className='fa-solid fa-plus' />
      </p>
    </div>
  );
};

export default AddRowButton;
