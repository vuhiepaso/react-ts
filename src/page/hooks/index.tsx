import * as React from "react";
// Hooks
import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallback, // App
  useMemo,
  useReducer,
  useContext,
  useImperativeHandle,
  useDebugValue,
} from "react";

import { memo } from "react";

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
  const [status, setStatus] = useState(true);
  useEffect(() => {
    console.log("CP_UseEffect(fuc)");
  });

  useEffect(() => {
    console.log("CP_UseEffect(fuc,[])");
  }, []);

  useEffect(() => {
    console.log("CP_UseEffect(fuc,[status])");
  }, [status]);

  return (
    <>
      <h4>UseEffect</h4>
      <div>{}</div>
      <button
        onClick={() => {
          setStatus(!status);
        }}
      >
        UseEffect
      </button>
      {/* {status ? <CP_UseEffect2></CP_UseEffect2> : <> </>} */}
    </>
  );
};
const CP_UseEffect2: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    console.log("connection");
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("dis Connect");
    };
  }, []);
  return (
    <>
      <h2>window width {width}</h2>
    </>
  );
};
interface Image {
  view: string;
}
const CP_UseEffect3: React.FC = () => {
  const [image, setImage] = useState<Image>();

  useEffect(() => {
    return () => {
      // cleanup in useEffect
      image && URL.revokeObjectURL(image.view);
    };
  }, [image]);

  const handleView = (img: any) => {
    const file = img.target.files[0];
    file.view = URL.createObjectURL(file);

    setImage(file);
  };
  return (
    <>
      <input type="file" onChange={handleView} name="Image" id="" />
      {image && image.view}
      <br />
      {image && <img src={image.view} alt="" />}
    </>
  );
};
// CP_UseLayoutEffect
const CP_UseLayoutEffect: React.FC = () => {
  const [count, setCount] = useState(0);
  useLayoutEffect(() => {
    if (count > 3) {
      setCount(0);
    }
  }, [count]);
  const handleRun = () => {
    setCount(count + 1);
  };
  return (
    <>
      <h2>{count}</h2>
      <div>
        <button onClick={handleRun}>Run</button>
      </div>
    </>
  );
};

// CP_UseRef
const CP_UseRef: React.FC = () => {
  const [count, setCount] = useState(60);
  const timerId = useRef<number>();
  const handleStart = () => {
    timerId.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timerId.current);
  };

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
};

// const CP_UseCallback: React.FC = () => {
//   const [count, setCount] = useState(60);
//   const handleStart = () => {
//     setCount(count + 1);
//   };
//   console.log("ok");
//   const handleStop = () => {
//     setCount(count - 1);
//   };

//   return (
//     <>
//       <h1>{count}</h1>
//       <button onClick={handleStart}>+</button>
//       <button onClick={handleStop}>_</button>
//     </>
//   );
// };
interface MyComponentProps {
  onEvClick: () => void;
}
const CP_UseCallback: React.FC<MyComponentProps> = memo(({ onEvClick }) => {
  //memo khỏi phải render lại những thừ không cần thiết
  console.log("render");
  return (
    <>
      <button onClick={onEvClick}>click</button>
    </>
  );
});
export {
  CP_UseState, // qảu lý variable get and set
  //
  CP_UseEffect, // UseEffect thực thí sau DOM đc render lại
  CP_UseEffect2, // UseEffect chạy một lần khi DOM đc render nếu Dependency List = []
  CP_UseEffect3, //UseEffect hới giống với watch ở vue
  //
  CP_UseLayoutEffect, // function thực hiện ở giai trước khi thay đổi DOM thật
  CP_UseRef, //  giống việc ta khai báo biến ở ngoài function CP_UseRef (đưa tham chiếu ra khỏi function)
  CP_UseCallback, // kết hợp với memo để không phải render lại các phần không cần thiết
};
