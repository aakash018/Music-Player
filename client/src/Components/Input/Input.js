import React from "react";

import "./input.css";
function Input({ type, handleChange, placeHolder, stateToSet }) {
  const handleInput = (e) => {
    if (type !== "file") handleChange(e.target.value, stateToSet);
    else handleChange(e.target.files[0], stateToSet);
  };

  return (
    <>
      <div className="inputContainer">
        <input
          type={type || "text"}
          onChange={handleInput}
          placeholder={placeHolder}
        ></input>
      </div>
    </>
  );
}

export default Input;
