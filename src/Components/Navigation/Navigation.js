import React from "react";

const Navigation = ({ changeState, currentState }, props) => {
  return (
    <nav className='db dt-l w-100 border-box pa3 ph5-l'>
      {currentState === "signin" ? (
        <h2 className='white-70 flex items-center tc '>Expense Manager</h2>
      ) : currentState === "signedin" ? (
        <>
          <div className='dtc v-mid mid-gray link dim w-25'>
            <h3
              className='white-70 bg-animate dim  pv2 ph4 center grow b--black-20 pointer dib mr3 mr4-l '
              onClick={() => changeState("profile")}
            >
              My Profile
            </h3>
          </div>
          <div className='db dtc-l v-mid w-100 w-50-l tc tr-l'>
            <h3
              className='white-70 bg-animate dim pv2 ph4 center grow b--black-20 pointer dib mr3 mr4-l '
              onClick={() => changeState("signin")}
            >
              LOGOUT
            </h3>
          </div>
        </>
      ) : currentState === "profile" ? (
        <>
          <div className='dtc v-mid mid-gray link dim w-25'>
            <h3
              className='white-70 bg-animate dim pv2 ph4 center grow b--black-20 pointer dib mr3 mr4-l '
              onClick={() => changeState("signedin")}
            >
              Home
            </h3>
          </div>
          <div className='db dtc-l v-mid w-100 w-50-l tc tr-l'>
            <h3
              className='white-70 bg-animate dim pv2 ph4 center grow b--black-20 pointer dib mr3 mr4-l '
              onClick={() => changeState("signin")}
            >
              LOGOUT
            </h3>
          </div>
        </>
      ) : (
        <p>Error</p>
      )}
    </nav>
  );
};

export default Navigation;
