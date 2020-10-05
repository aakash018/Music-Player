import React from "react";

function Select({ options, stateToSet }) {
  const handleChange = (e) => {
    stateToSet(e.target.value);
  };

  return (
    <>
      <select onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index}>{option}</option>
        ))}
      </select>
    </>
  );
}

export default Select;
