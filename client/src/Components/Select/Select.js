import React from "react";

function Select({ options, stateToSet }) {
  const handleChange = (e) => {
    stateToSet(e.target.value);
  };

  return (
    <>
      <select onChange={handleChange}>
        <option
          selected={true}
          style={{ display: "none", fontFamily: "Poppins" }}
        >
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
