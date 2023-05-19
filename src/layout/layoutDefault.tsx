import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import {
  EnvironmentOutlined,
  FacebookOutlined,
  LoginOutlined,
  LogoutOutlined,
  MailOutlined,
  PhoneOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Modal } from "antd";

import Menu from "../components/ui/Menu";
import { RootState, useAppDispatch } from "../store";
import "./css/index.css";
import { logoutAction } from "../store/sliceAuth";

function LayoutDefault() {
  const state = useSelector((state: RootState) => state).auth;
  const carSate = useSelector((state: RootState) => state).card;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    dispatch(logoutAction());
    navigate("/auth");
  };

  return (
    <>
      <header className="box_header">
        <div className="container m-auto  flex justify-between items-center px-7 py-4 ">
          <Link to={"/"}>
            <h2 className="text-3xl font-bold logo">
              MY <span className="earth">EARTH</span>
            </h2>
          </Link>
          <nav>
            <Menu isAuth={state.isAuth} />
          </nav>
          <div className="flex justify-between items-center">
            <div className="mt-1 mr-1">{state.profile.username || "Name"}</div>
            <div className="mx-3">|</div>
            {state.isAuth && (
              <>
                <Link to={"/cart"}>
                  <Badge count={carSate.products.length}>
                    <ShoppingCartOutlined
                      style={{ color: "#fff" }}
                      className="text-2xl "
                    />
                  </Badge>
                </Link>
                <div className="mx-3">|</div>
              </>
            )}
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
      <div className="container mx-auto mb-5 ">
        <Outlet />
      </div>
      <footer className="box__footer container m-auto">
        <div className="px-10 py-5">
          <h2 className="text-3xl font-bold logo">
            MY <span className="earth">EARTH</span>
          </h2>
          <div className="mt-5 " style={{ lineHeight: 2 }}>
            <div className="flex items-center">
              <MailOutlined /> <span className="ml-3">abc@vmodev.com</span>
            </div>
            <div className="flex items-center">
              <PhoneOutlined /> <span className="ml-3">19009168</span>
            </div>
            <div className="flex items-center">
              <FacebookOutlined />{" "}
              <span className="ml-3">https://www.facebook.com</span>
            </div>
            <div className="flex items-center">
              <EnvironmentOutlined />{" "}
              <span className="ml-3">
                19 - Duy Tan - Nam Tu Liem - HaNoi - VN
              </span>
            </div>
          </div>
        </div>
      </footer>

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
