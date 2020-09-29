import React from "react";

function RoundButtons({ text, width, height, backgroundColor, handleClick }) {
  const style = {
    width: width || "50px",
    height: height || "50px",
    backgroundColor: backgroundColor || "#C4C4C5",

    outline: "none",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <div>
      <div style={style} onClick={handleClick}>
        {text}
      </div>
    </div>
  );
}

export default RoundButtons;
