function MainSection({ children, dispatch }) {
  return (
    <main className="main">
      {/* <button className="btn btn-ui" onClick={() => dispatch({ type: "prev" })}>
        Prev
      </button> */}
      {children}
      {/* <button className="btn btn-ui" onClick={() => dispatch({ type: "next" })}>
        Next
      </button> */}
    </main>
  );
}

export default MainSection;
