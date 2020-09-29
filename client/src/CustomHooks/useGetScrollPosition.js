import { useState, useEffect } from "react";

function useGetScrollPositon() {
  const [getTopPosition, setGetTopPosition] = useState(0);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      setGetTopPosition(window.scrollY);
    });
    return document.removeEventListener("scroll", () => {});
  });

  return getTopPosition;
}

export default useGetScrollPositon;
