function LayoutDefault(props: any) {
  return (
    <>
      <header>Header for</header>
      {props.children}
      <footer>Footer for</footer>
    </>
  );
}
export default LayoutDefault;
