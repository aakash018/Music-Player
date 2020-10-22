import React from "react";

function Select({ options, stateToSet }) {
  const handleChange = (e) => {
    stateToSet(e.target.value);
  };

  const selectStyle = {width: "70%", height:"30px", fontFamily: "Poppins", cursor: "pointer", outline: "none"}

  return (
    <>
      <select onChange={handleChange} style={selectStyle}>
        <option style={{ display: "none" }}>
          -- Select an Album --
        </option>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </>
  );
}

export default Select;
