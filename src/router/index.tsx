import { createBrowserRouter } from "react-router-dom";
// Page
import Home from "../page/home";
import Auth from "../page/auth";
//layout
import LayoutAuth from "../layout/auth";
import LayoutDefault from "../layout/layoutDefault";

const router = createBrowserRouter([
  {
    path: "/",
    element:
    <LayoutDefault>
      <Home />
    </LayoutDefault>,
  },
  
  {
    path: "/auth",
    element: 
    <LayoutDefault>
      <Auth />
    </LayoutDefault>,
  },
]);
export { router };
