import { createBrowserRouter, useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
//Throw errors
import { err400 } from "../page/throwErrors";
//Layout
import LayoutAuth from "../layout/auth";
import LayoutDefault from "../layout/layoutDefault";
// Page
import Home from "../page/home";
import Auth from "../page/auth";
import Equipment from "../page/equipment";
import Room from "../page/room";
import { RootState } from "../store";

const IsAuth = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  if (!state.auth.myToke) {
    setTimeout(() => {
      navigate("/auth");
    }, 600);
  }

  return <Outlet />;
};

const router = createBrowserRouter([
  {
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      // Page request auth
      {
        element: <IsAuth />,
        children: [
          {
            path: "/equipment",
            element: <Equipment />,
          },
          {
            path: "/room",
            element: <Room />,
          },
        ],
      },
    ],
  },

  {
    element: <LayoutAuth />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  // Handle page err
  {
    path: "*",
    element: err400,
  },
]);

export { router };
