import { createBrowserRouter } from "react-router-dom";
//Throw errors
import { err404 } from "../page/throwErrors";
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
import Cart from "../page/cart";

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
            element: <Cart />,
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
    element: err404,
  },
]);

export { router };
