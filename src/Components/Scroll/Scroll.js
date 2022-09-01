import React from "react";
import "./Scroll.css";

const Scroll = (props) => {
  return (
    <div className='scrollborder' id='style-1'>
      {props.children}
    </div>
  );
};

export default Scroll;
