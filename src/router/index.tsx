import routerDom, { createBrowserRouter } from "react-router-dom";
// Page
import Home from "../page/home";
import Auth from "../page/auth";
//layout
import LayoutAuth from "../layout/auth";
import LayoutDefault from "../layout/layoutDefault";

// routerDom.useBeforeUnload(
//   () => {
//     console.log('ok')
//   }
// )
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LayoutDefault>
        <Home />
      </LayoutDefault>
    ),
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
export { router, routerDom };
