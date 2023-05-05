import "./App.css";
import { RouterProvider, useLocation } from "react-router-dom";
import { router } from "./router";

import LayoutDefault from "./layout/layoutDefault";
function App() {
  const Layout = LayoutDefault;
  const location1 = useLocation();
  console.log(location1.pathname);
  return (
    <>
      <div>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </div>
    </>
  );
}

export default App;
