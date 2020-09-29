import React, { useContext, useEffect, useState } from "react";

import MdArrow from "react-ionicons/lib/MdArrowRoundForward";

import useGetScrollPositon from "../../CustomHooks/useGetScrollPosition";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import RoundButtons from "../RoundButtons/roundButtons";

//Style
import "./songGroup.css";
import AlbumsSelection from "./Albums/AlbumsSelection";
import { Playing } from "../../Context/Playing";

function SongGroups() {
  const topPosition = useGetScrollPositon();

  const [showMenu, setShowMenu] = useState(false);
  const { audio, setPlaying } = useContext(Playing);
  const [showalbumMenu, setShowalbumMenu] = useState(false);

  const [statusOfMusicPlaying, setStatusOfMusicPlaying] = useState(Boolean);

  useEffect(() => {
    if (topPosition < 80) {
      setShowMenu(false);
    }
  }, [topPosition]);

  const handleAlbumsChange = () => {
    setStatusOfMusicPlaying(audio.paused);
    console.log(audio.paused);
    audio.pause();
    setPlaying(false);
    setShowalbumMenu((prevShow) => !prevShow);
  };

  const handlePlaylistsChange = () => {
    console.log("Palylisr");
  };

  const handleArrowClick = () => {
    setShowMenu((prevShow) => !prevShow);
  };

  return (
    <>
      <div
        className={
          topPosition > 80 ? "songGroupContainer show" : "songGroupContainer"
        }
      >
        <RoundButtons
          text={<MdArrow color="white" />}
          backgroundColor="none"
          handleClick={handleArrowClick}
        />

        <section className="dropDownMenu-songGroups">
          <DropDownMenu
            show={showMenu}
            options={{
              Playlist: () => handlePlaylistsChange(),
              Albums: () => handleAlbumsChange(),
            }}
          />
        </section>
      </div>
      <section className="menuOptions">
        <AlbumsSelection
          show={showalbumMenu}
          statusOfMusicPlaying={statusOfMusicPlaying}
        />
      </section>
    </>
  );
}

export default SongGroups;
