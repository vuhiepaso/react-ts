import * as React from "react";
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback,
  useMemo,
  useReducer,
  useContext,
  useImperativeHandle,
  useDebugValue,
} from "react";

// CP_UseState
const CP_UseState: React.FC = () => {
  const [name, setName] = useState("name");

  const [age, setAge] = useState(() => {
    const newAge = 2023 - 2001;
    return newAge;
  });

  function onClick() {
    setName("Vu Dinh Hiep");
    setAge(26);
  }
  return (
    <>
      <h4>UseState</h4>
      <div>{name}</div>
      <div>{age}</div>
      <button onClick={onClick}>setName</button>
    </>
  );
};

//CP_UseEffect
const CP_UseEffect: React.FC = () => {
  return (
    <>
      <h4>UseEffect</h4>
      <div>content</div>
    </>
  );
};
export { CP_UseState, CP_UseEffect };
