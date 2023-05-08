import { Link } from "react-router-dom";
import Menu from "../ui/Menu";
import { useSelector } from "react-redux";
function LayoutDefault(props: any) {
  const state = useSelector((state) => state);
  console.log("state", state);
  return (
    <>
      <header className="bg-green-100">
        <div className="container flex justify-between items-center px-5 py-7">
          <h2 className="text-3xl">MY HOME</h2>
          <div className="flex ">
            <Link to={"/auth"}>Login</Link>
          </div>
        </div>
      </header>
      <nav>
        <Menu />
      </nav>
      {/* body content */}
      <div>{props.children}</div>
      <footer>Footer for</footer>
    </>
  );
}
export default LayoutDefault;
