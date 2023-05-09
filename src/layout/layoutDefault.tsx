import { Link } from "react-router-dom";
import Menu from "../ui/Menu";
import { useSelector } from "react-redux";
import "./css/index.css";
function LayoutDefault(props: any) {
  const state = useSelector((state) => state);
  // console.log("state", state);
  return (
    <>
      <header className="box_header">
        <div className="container m-auto font-bold flex justify-between items-center  py-7 ">
          <h2 className="text-3xl">MY HOME</h2>
          <div className="flex ">
            <Link to={"/auth"}>Login</Link>
          </div>
        </div>
      </header>
      <nav>
        <Menu />
      </nav>
      {/* body content */}
      <div className="container m-auto">
        ssssssss
        {props.children}
      </div>
      <footer className="box__footer container m-auto">Footer for</footer>
    </>
  );
}
export default LayoutDefault;
