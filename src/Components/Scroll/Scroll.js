import React from "react";
import "./Scroll.css";

const Scroll = (props) => {
  return (
    <div className='scrollborder fl bg-white' id='style-1'>
      {props.children}
    </div>
  );
};

export default Scroll;
