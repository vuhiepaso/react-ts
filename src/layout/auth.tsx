import "./css/index.css";
function LayoutAuth(props: any) {
  return (
    <>
      <header className="box_header">
        <div className="text-center font-bold px-5 py-7">
          <h2 className="text-3xl">MY HOME</h2>
        </div>
      </header>
      {props.children}
      {/* <footer>Footer for</footer> */}
    </>
  );
}
export default LayoutAuth;
