import React, { useState } from "react";
import MainBanner from "../MainBanner/mainBanner";
import AudioPlayer from "../AudioPlayer/audioPlayer";

import { Playing } from "../../Context/Playing";
import SongsContainer from "../SongsContainer/songsContainer";
import VolumeControl from "../VolumeControl/volumeControl";
import SongGroups from "../SongGroups/songGroups";
import AddMusic from "../AddMusic/AddMusic";

const WelcomeElements = ({
  toggle,
  songs,
  setCurrentSong,
  audio,
  currentSong,
  setSongs,
  albums,
  ...rest
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(
    localStorage.getItem("-music-app-volume") || 1
  );

  return (
    <main>
      <Playing.Provider
        value={{
          toggle,
          playing,
          setPlaying,
          currentSong,
          setCurrentSong,
          volume,
          setVolume,
          setSongs,
          songs,
          audio,
          albums
        }}
      >
        <MainBanner toggle={toggle} />
       
        <div className="main-menu-options">
          <SongGroups />
          <AddMusic />
        </div>
        <div className="audioPlayerContainer">
          <AudioPlayer
            toggle={toggle}
            songs={songs}
            setCurrentSong={setCurrentSong}
            audio={audio}
            {...rest}
          />
        </div>

        <SongsContainer
          songs={songs}
          setCurrentSong={setCurrentSong}
          audio={audio}
        />
        <div className="volumeControllerContainer">
          <VolumeControl audio={audio} />
        </div>
      </Playing.Provider>
    </main>
  );
};

export default WelcomeElements;
