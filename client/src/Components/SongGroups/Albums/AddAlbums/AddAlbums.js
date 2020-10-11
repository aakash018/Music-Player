import React from "react";

import RoundButtons from "../../../RoundButtons/roundButtons";

function AddAlbums({ showModal, setShowModal }) {
  const handleModal = () => {
    // albumSelectionModla((prevState) => !prevState);
    setShowModal((prevState) => !prevState);
  };

  return (
    <div>
      <RoundButtons
        text="+"
        width="30px"
        height="30px"
        handleClick={handleModal}
      />
    </div>
  );
}

export default AddAlbums;
