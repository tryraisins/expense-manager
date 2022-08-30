import React from "react";
import profile from "../../assets/profile.webp";
const Navigation = ({ changeState, currentState }, props) => {
  return (
    <nav className='db dt-l w-100 border-box pa3 ph5-l'>
      {currentState === "signin" ? (
        <h2 className='white-70 flex items-center tc '>Express Manager</h2>
      ) : currentState === "signedin" ? (
        <>
          <div className=' db dtc-l v-mid mid-gray w-100 w-50-l tc tl-l center mb2 mb0-l'>
            <div className=''>
              <img
                src={profile}
                className='dib w3 h3 ma0-l dim pointer br-100'
                alt='Profile Pic'
              />
            </div>
            <p className='white ma0 f3 '>John Smith</p>
            <p className='white f5 mt0'>
              Business Analyst in Accounting Department
            </p>
            <p className='white f5 mt0'>
              <i class='fa-solid fa-location-crosshairs mr1' />
              Nigeria
            </p>
          </div>
          <div class='db dtc-l v-mid w-100 w-50-l tc tr-l'>
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
