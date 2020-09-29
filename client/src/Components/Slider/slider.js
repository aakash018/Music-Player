import React from "react";

import "./slider.css";
function Slider({ handelChange, setValue, value, max, min, step }) {
  const handleSlider = (e) => {
    handelChange();
    setValue(e.target.value);
  };

  // const style = {
  //   webkitAppearance: "none",
  //   height: "5px",
  //   width: "100%",
  // };

  return (
    <div className="inputRangeWraper">
      <input
        type="range"
        min={min || "0"}
        max={max || "1"}
        step={step || "0.05"}
        onChange={handleSlider}
        style={{ cursor: "pointer" }}
        value={value}
        className="slider"
      />
    </div>
  );
}

export default Slider;
