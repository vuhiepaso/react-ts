import { createBrowserRouter } from "react-router-dom";
// Page
import Home from "../page/home";
import Auth from "../page/auth";
//layout
import LayoutAuth from "../layout/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    handle: {
      layout: "",
    },
  },
  {
    path: "/auth",
    element: <Auth />,
    handle: {
      layout: LayoutAuth,
    },
  },
]);
export { router };
