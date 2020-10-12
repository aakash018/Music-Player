import React, { useContext, useState, useEffect, useCallback } from "react";

//Context
import { Playing } from "../../Context/Playing";

//Components
import SongNameDisplay from "./SongNameDisplay/songNameDisplay";
import ProgressBar from "../ProgressBar/ProgressBar";

//Album Array
// import { albums } from "../../Music/songs";

//Icons
import MdPause from "react-ionicons/lib/MdPause";
import MdPlay from "react-ionicons/lib/MdPlay";
import MdSkipBackward from "react-ionicons/lib/IosSkipBackward";
import MdSkipForward from "react-ionicons/lib/IosSkipForward";
import RoundButtons from "../RoundButtons/roundButtons";

//Style
import "./audioPlayer.css";

function AudioPlayer({
  toggle,
  setCurrentSong,
  audio,
  songs,
  indexOfCurrentSong,
  
}) {
  const { playing, setPlaying, volume, albums } = useContext(Playing);
  const [playNextSong, setPlayNext] = useState(false);

  const handlePrevSong = () => {
    if (songs[indexOfCurrentSong - 1] === undefined) {
      setCurrentSong(songs[indexOfCurrentSong].song);
    } else {
      setCurrentSong(songs[indexOfCurrentSong - 1].song);
    }

    audio.pause();
    setPlayNext(true);
  };

  const handleNextSong = useCallback(() => {
    if (songs[indexOfCurrentSong + 1] === undefined) {
      setCurrentSong(songs[indexOfCurrentSong].song);
    } else {
      setCurrentSong(songs[indexOfCurrentSong + 1].song);
    }

    audio.pause();
    setPlayNext(true);
  }, [setCurrentSong, audio, indexOfCurrentSong, songs]);

  useEffect(() => {
    audio.volume = volume;
    audio.addEventListener("ended", () => {
      handleNextSong();
    });

    if (playNextSong) {
      audio.play();

      document.title = songs[indexOfCurrentSong].name;
      setPlaying(true);
      setPlayNext(false);
    }

    return audio.removeEventListener("ended", () => {});
  }, [
    playNextSong,
    audio,
    setPlaying,
    indexOfCurrentSong,
    songs,
    volume,
    handleNextSong,
  ]);

  const [slider, setSlider] = useState(false);

  const handleSlider = () => {
    setSlider(!slider);
  };

  const handleFindingAlbum = (songName) => {
    return albums.find((album) => {
      return album.name === songName;
    });
  };

  return (
    <div>
      {songs[0] != null && (
        <div
          className={slider ? "audioPlayerWraper " : "audioPlayerWraper show"}
        >
          {albums[0] != null && <section className="coverSection" onClick={handleSlider}>
            <img
              src={
                handleFindingAlbum(
                  songs[indexOfCurrentSong] != null
                    ? songs[indexOfCurrentSong].album
                    : songs[0].album
                ).img
              }
              className="coverImage"
              alt=""
            />
          </section>
}
          <section className="playerSection">
            <section className="displayName">
              <SongNameDisplay
                songName={
                  songs[indexOfCurrentSong] != null
                    ? songs[indexOfCurrentSong].name
                    : songs[0].name
                }
              />
            </section>
            <section className="progressBar">
              <ProgressBar audio={audio} />
            </section>
            <div className="controls">
              <RoundButtons
                text={<MdSkipBackward fontSize="1rem" />}
                width="30px"
                height="30px"
                handleClick={handlePrevSong}
              />
              <RoundButtons
                text={
                  playing ? (
                    <MdPause fontSize="1rem" />
                  ) : (
                    <MdPlay fontSize="1rem" />
                  )
                }
                width="30px"
                height="30px"
                handleClick={() => {
                  setPlaying(!playing);
                  toggle();
                }}
              />
              <RoundButtons
                text={<MdSkipForward fontSize="1rem" />}
                width="30px"
                height="30px"
                handleClick={handleNextSong}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default AudioPlayer;
