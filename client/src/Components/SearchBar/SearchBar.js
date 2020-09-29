import React from "react";
import Input from "../Input/Input";

import "./searchBar.css";
function SearchBar({ listToSearchFrom, factorToLook, callback }) {
  //Function to escape special RegEx characters
  function escapeRegex(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
  }

  const handleInput = (input) => {
    const filteredList = listToSearchFrom.filter((element) => {
      if (factorToLook) {
        console.log(input);
        return element[factorToLook].match(
          new RegExp(escapeRegex(input.trim()), "i")
        );
      } else {
        return element.match(
          new RegExp(input.trim(escapeRegex(input.trim())), "i")
        );
      }
    });

    callback(filteredList);
  };

  return (
    <>
      <div className="searchBarContainer">
        <Input handleChange={handleInput} placeHolder="Search" />
      </div>
    </>
  );
}

export default SearchBar;
