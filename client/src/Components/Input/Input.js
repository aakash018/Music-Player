import React from "react";

import "./input.css";
function Input({ handleChange, placeHolder }) {
  const handleInput = (e) => {
    handleChange(e.target.value);
  };

  return (
    <>
      <div className="inputContainer">
        <input
          type="text"
          onChange={handleInput}
          placeholder={placeHolder}
        ></input>
      </div>
    </>
  );
}

export default Input;
