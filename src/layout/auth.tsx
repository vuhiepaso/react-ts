import { Outlet } from "react-router-dom";
import "./css/index.css";
function LayoutAuth() {
  return (
    <>
      <header className="box_header">
        <div className="text-center font-bold px-5 py-7">
          <h2 className="text-3xl">MY HOME </h2>
        </div>
      </header>
      <Outlet />
      {/* <footer>Footer for</footer> */}
    </>
  );
}
export default LayoutAuth;
