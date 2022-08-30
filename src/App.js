import "tachyons";
import React, { useState } from "react";

import "./App.css";

import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import SignIn from "./Components/Sign In/SignIn";

import Main from "./Components/Main/Main";

function App() {
  const [state, setState] = useState("signin");
  const [modal, setModal] = useState(false);

  const stateUpdate = (newState) => {
    setState(newState);
  };
  const ToggleModal = (state) => {
    setModal(state);
    console.log(`modal is now ${state}`);
  };
  return (
    <div>
      <Navigation changeState={stateUpdate} currentState={state}>
        <Logo />
      </Navigation>

      {state === "signin" ? (
        <div>
          <SignIn changeState={stateUpdate} />
        </div>
      ) : state === "signedin" ? (
        <div>
          <Main ToggleModal={ToggleModal} modal={modal} />
        </div>
      ) : (
        <h1>Unknown Error</h1>
      )}
    </div>
  );
}

export default App;
