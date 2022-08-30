import "tachyons";
import React, { useState } from "react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import "./App.css";
import ParticlesBackground from "./Components/Particles/Particles";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import SignIn from "./Components/Sign In/SignIn";

import Main from "./Components/Main/Main";

function App() {
  const [state, setState] = useState("signin");

  const stateUpdate = (newState) => {
    setState(newState);
  };
  return (
    <div>
      <Navigation changeState={stateUpdate} currentState={state}>
        <Logo />
      </Navigation>

      {state === "signin" ? (
        <div>
          <ParticlesBackground />
          <SignIn changeState={stateUpdate} />
        </div>
      ) : state === "signedin" ? (
        <div className='vh vw'>
          <Main />
        </div>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </div>
  );
}

export default App;
