import { createBrowserRouter } from "react-router-dom";
//Throw errors
import { err400 } from "../page/throwErrors";
//Layout
import LayoutAuth from "../layout/auth";
import LayoutDefault, { IsAuth } from "../layout/layoutDefault";
// Page
import Home from "../page/home";
import Auth from "../page/auth";
import Equipment from "../page/equipment";
import Room from "../page/room";
import Register from "../page/auth/Register";

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
      {
        path: "/register",
        element: <Register />,
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
