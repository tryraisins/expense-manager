import React from "react";

const Navigation = ({ changeState, currentState }, props) => {
  return (
    <nav className='dt w-100 border-box pa3 ph5-l'>
      {currentState === "signin" ? (
        <h2 className='white-70 flex items-center tc '>Expense Manager</h2>
      ) : currentState === "signedin" ? (
        <>
          <div className='dtc v-mid mid-gray link dim w-50'>
            <h3
              className='white-70 bg-animate dim pv2 ph4 center grow b--black-20 pointer dib'
              onClick={() => changeState("profile")}
            >
              MY PROFILE
            </h3>
          </div>
          <div className='dtc v-mid w-50 tc  tr  '>
            <h3
              className='white-70 bg-animate dim pv2 ph4 fr grow b--black-20 pointer dib mr3  '
              onClick={() => changeState("signin")}
            >
              LOGOUT
            </h3>
          </div>
        </>
      ) : currentState === "profile" ? (
        <>
          <div className='dtc v-mid mid-gray link dim w-50'>
            <h3
              className='white-70 bg-animate dim pv2 ph4 center grow b--black-20 pointer dib'
              onClick={() => changeState("signedin")}
            >
              HOME
            </h3>
          </div>
          <div className='dtc v-mid w-50 tc  tr  '>
            <h3
              className='white-70 bg-animate dim pv2 ph4 fr grow b--black-20 pointer dib mr3  '
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
