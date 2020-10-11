import React, { useState } from "react";

//Hooks
import useGetTopPosition from "../../CustomHooks/useGetScrollPosition";

//Components
import RoundButtons from "../RoundButtons/roundButtons";

//Style
import "./addMusic.css";
import MusicAddModal from "./MusicAddModal";

function AddMusic() {
  const topPosition = useGetTopPosition();

  const [showModal, setShowModal] = useState(false);

  const handleAddButtonClick = () => {
    setShowModal((prevState) => !prevState);
  };

  return (
    <>
      <div
        className={
          topPosition > 80 ? "addMusicContainer show" : "addMusicContainer"
        }
      >
        <RoundButtons
          text="+"
          backgroundColor="#00000000"
          handleClick={handleAddButtonClick}
        />
      </div>
      <div>
        <MusicAddModal showModal={showModal} />
      </div>
    </>
  );
}

export default AddMusic;
