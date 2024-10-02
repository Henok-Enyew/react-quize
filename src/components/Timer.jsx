import { useEffect } from "react";

function Timer({ secRemaining, dispatch }) {
  const min = Math.floor(secRemaining / 60);
  const sec = secRemaining % 60;

  useEffect(
    function () {
      const id = setTimeout(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [secRemaining]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
