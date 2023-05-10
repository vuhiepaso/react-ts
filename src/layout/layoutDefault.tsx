import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Menu from "../ui/Menu";
import "./css/index.css";
import { LogoutOutlined } from "@ant-design/icons";
import { RootState } from "../store";
function LayoutDefault() {
  const state = useSelector((state: RootState) => state).auth;
  // console.log("state", state.profile.username);
  // console.log("reload Layout Default");
  return (
    <>
      <header className="box_header">
        <div className="container m-auto  flex justify-between items-center  py-4 ">
          <h2 className="text-3xl font-bold">MY HOME</h2>
          <div className="flex ">
            <span> {state.profile.username} </span>
            <Link to={"/auth"} title="logout">
              <LogoutOutlined className="py-4 text-2xl" />
            </Link>
          </div>
        </div>
      </header>
      <nav>
        <Menu />
      </nav>
      {/* body content */}
      <div className="container m-auto">
        <Outlet />
      </div>
      <footer className="box__footer container m-auto">Footer for</footer>
    </>
  );
}
export default LayoutDefault;
