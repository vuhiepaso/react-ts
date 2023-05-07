import { Link } from "react-router-dom";
import Menu from "../ui/Menu";
function LayoutDefault(props: any) {
  return (
    <>
      <header className="">
        <div className="container flex justify-between px-5">
          <h2 className="text-3xl">MY HOME</h2>
          <div>
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
