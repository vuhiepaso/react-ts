import { Outlet } from "react-router-dom";
import "./css/index.css";
function LayoutAuth() {
  return (
    <>
      <header className="box_header">
        <div className="text-center font-bold px-5 py-7">
          <h2 className="text-3xl font-bold logo">
            MY <span className="earth">EARTH</span>
          </h2>
        </div>
      </header>
      <div style={{ height: "100vh" }} className=" box-bg--auth">
        <div className="box-bg--outlet pt-24">
          <Outlet />
        </div>
      </div>
    </>
  );
}
export default LayoutAuth;
