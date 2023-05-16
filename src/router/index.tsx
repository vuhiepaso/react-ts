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
import ProductDetail from "../page/product/ProductDetail";

const router = createBrowserRouter([
  {
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:page?/:product_id",
        element: <ProductDetail />,
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
          {
            path: "/cart",
            element: <div>cart</div>,
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
