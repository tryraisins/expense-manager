import React from "react";

const Navigation = ({ changeState, currentState }, props) => {
  return (
    <nav className=' flex justify-between   '>
      <h2 className='white-70 flex items-center pa3'>Express Manager</h2>
      <div className='flex-grow pa3 flex items-left'>
        {currentState === "signin" ? (
          <></>
        ) : currentState === "signedin" ? (
          <h3
            className='dib white-70 bg-animate dim pv2 ph4  grow b--black-20 pointer'
            onClick={() => changeState("signin")}
          >
            LOGOUT
          </h3>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
