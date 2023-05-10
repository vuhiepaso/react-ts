import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
const Menu: React.FC = () => {
  const dataMenu = [
    {
      name: "Home",
      to: "/",
    },
    // {
    //   name: "Login",
    //   to: "/auth",
    // },
    {
      name: "Equipment",
      to: "/equipment",
    },
    {
      name: "Room",
      to: "/room",
    },
  ];
  return (
    <>
      <div className="container__nav flex justify-center w-full">
        {dataMenu.map((item, index) => (
          <div className="p-2" key={index}>
            <Link to={item.to}>{item.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
