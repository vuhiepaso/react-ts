import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";
const Menu = ({ onChange, isAuth }: any) => {
  const [isActivated, setIsActivated] = useState("/");
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname.split("/");
    setIsActivated("/" + path[1]);
  });
  const dataMenu = [
    {
      name: "Home",
      to: "/",
      isAuth: true,
    },
    {
      name: "Equipment",
      to: "/equipment",
      isAuth: isAuth,
    },
    // {
    //   name: "Room",
    //   to: "/room",
    // },
  ];
  return (
    <>
      <div className="container__nav flex justify-center w-full display__box--pc">
        {dataMenu.map((item, index) => (
          <Link
            style={item.isAuth ? {} : { display: "none" }}
            to={item.to}
            key={index}
          >
            <div
              className={`p-2 mx-2  box__to--link ${
                isActivated === item.to ? "mn_active" : ""
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
      {/* DEVICE MOB */}
      <div className="container__nav  w-full max-md display__box--mob">
        {dataMenu.map((item, index) => (
          <Link
            className="my-2"
            style={item.isAuth ? {} : { display: "none" }}
            to={item.to}
            key={"mob" + index}
            onClick={() => (isActivated !== item.to ? onChange(item.to) : null)}
          >
            <div
              className={`p-2 mx-2  box__to--link ${
                isActivated === item.to ? "mn_active" : ""
              }`}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Menu;
