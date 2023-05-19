import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";
const Menu = ({ isAuth }: any) => {
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
      <div className="container__nav flex justify-center  w-full">
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
    </>
  );
};

export default Menu;
