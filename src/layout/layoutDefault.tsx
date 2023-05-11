import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Modal } from "antd";

import Menu from "../components/ui/Menu";
import { RootState, useAppDispatch } from "../store";
import "./css/index.css";
import { logoutAction } from "../store/sliceAuth";

function LayoutDefault() {
  const state = useSelector((state: RootState) => state).auth;
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  // console.log("state", state.profile.username);
  // console.log("reload Layout Default");

  const handleOk = () => {
    dispatch(logoutAction());
    navigate("/auth");
  };

  return (
    <>
      <header className="box_header">
        <div className="container m-auto  flex justify-between items-center px-7 py-4 ">
          <h2 className="text-3xl font-bold logo">
            MY <span className="earth">EARTH</span>
          </h2>
          <nav>
            <Menu />
          </nav>
          <div className="flex justify-between items-center">
            <div className="mt-1 mr-1">{state.profile.username || "Name"}</div>
            <div className="mx-3">|</div>

            {state.isAuth ? (
              <div className="flex  items-center" onClick={() => setOpen(true)}>
                <div className="mt-1 mr-1">Logout</div>
                <LogoutOutlined className="icon_logout py-4 text-xl font-black" />
              </div>
            ) : (
              <>
                <Link to={"/auth"} className="flex  items-center">
                  <div className="mt-1 mr-1">Login</div>
                  <LoginOutlined className="py-4 text-2xl" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* body content */}
      <div className="container m-auto">
        <Outlet />
      </div>
      <footer className="box__footer container m-auto">Footer for</footer>

      {/* Modal Logout */}
      <Modal
        title="Do you want to sign out of earth?"
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      ></Modal>
    </>
  );
}
export default LayoutDefault;

export const IsAuth = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  if (!state.auth.isAuth) {
    setTimeout(() => {
      navigate("/auth");
    }, 0);
  }
  return <Outlet />;
};
