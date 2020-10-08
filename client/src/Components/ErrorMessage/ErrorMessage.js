import React from "react";

function ErrorMessage({ errorMessage, fontSize, color }) {
  const errorMessageStyle = {
    fontSize: fontSize || "1.3rem",
    color: color || "red",
  };

  return (
    <div className="errorMessageContainer" style={errorMessageStyle}>
      <span>{errorMessage}</span>
    </div>
  );
}

export default ErrorMessage;
