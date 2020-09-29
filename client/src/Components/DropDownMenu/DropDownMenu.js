import React from "react";

import "./dropDownMenu.css";
function DropDownMenu({ show, options, overflowScroll }) {
  const optionsNames = Object.keys(options);

  return (
    <div>
      <div className={show ? "dropDownContainer show" : "dropDownContainer"}>
        <div className="dropDownWraper">
          <ul>
            {optionsNames.map((optionName, index) => (
              <li key={index} onClick={() => options[optionName]()}>
                {optionName}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropDownMenu;
