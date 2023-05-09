import { createBrowserRouter } from "react-router-dom";
// Page
import Home from "../page/home";
import Auth from "../page/auth";
//layout
import LayoutAuth from "../layout/auth";
import LayoutDefault from "../layout/layoutDefault";

const IsAuth = ({ children }: { children: JSX.Element }) => {
  return <>{children}</>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutDefault>
        <Home />
      </LayoutDefault>
    ),
    // children: [
    //   {
    //     element: <Home />,
    //   },
    // ],
  },

  {
    path: "/auth",
    element: (
      <LayoutAuth>
        <Auth />
      </LayoutAuth>
    ),
  },
  // { path: "*", element: <NotFound /> },
]);
export { router };
