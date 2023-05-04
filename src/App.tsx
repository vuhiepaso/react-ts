import { useState, useCallback } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import "./App.css";
import {
  CP_UseState,
  CP_UseEffect,
  CP_UseEffect2,
  CP_UseEffect3,
  CP_UseLayoutEffect,
  CP_UseRef,
  CP_UseCallback,
  CP_UseReducer,
} from "./page/hooks";

function App() {
  // const [count, setCount] = useState(0)
  // const [toggle, setToggle] = useState(false);
  const [click, setClick] = useState(0);
  const handleClick = useCallback(() => {
    setClick((a) => a + 1);
  }, []);

  return (
    <>
      <div>
        {/* <CP_UseState></CP_UseState>
        <br />
        <CP_UseEffect></CP_UseEffect>
        <br />
        <CP_UseEffect2 />
        <br /> */}
        {/* <button onClick={() => setToggle(!toggle)}>Toggle</button>
        {toggle && <CP_UseEffect3 />}
        <br /> */}
        {/* <CP_UseLayoutEffect /> */}
        <br />
        {/* <CP_UseRef /> */}
        {/* <CP_UseCallback onEvClick={handleClick} />
        <h1>{click}</h1> */}
        <CP_UseReducer></CP_UseReducer>
      </div>
    </>
  );
}

export default App;
