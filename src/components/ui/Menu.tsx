import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Menu.css";
const Menu: React.FC = () => {
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
    },
    {
      name: "Equipment",
      to: "/equipment",
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
          <Link to={item.to} key={index}>
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
