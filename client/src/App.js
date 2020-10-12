import React, { useState, useRef } from "react";

//Componenets
import WelcomeElements from "./Components/WelcomeElements/welcomeElements";

import "./App.css";
import { useGetSongs } from "./CustomHooks/useGetSongs";
import { useGetAlbums } from "./CustomHooks/useGetAlbums";

function App() {
  const [songs, setSongs] = useGetSongs();
  const [albums] = useGetAlbums()

  let indexOfCurrentSong = useRef(localStorage.getItem("-music-app-key") || 0);

  const [currentSong, setCurrentSong] = useState(() => {
    if (songs[indexOfCurrentSong.current] != null) {
      return songs[indexOfCurrentSong.current].song;
    } else if (songs[0] != null) {
      return songs[0].song;
    } else {
      return;
    }
  });

  for (let song of songs) {
    if (song.song === currentSong) {
      indexOfCurrentSong.current = songs.indexOf(song);
      localStorage.setItem("-music-app-key", indexOfCurrentSong.current);
      break;
    }
  }

  const audio = new Audio(currentSong);

  const toggle = () => {
    if(songs[0] != null){
    if (audio.paused) {
      if (audio.src === "") {
        audio.src = songs[indexOfCurrentSong.current].song;
      }
      document.title = songs[indexOfCurrentSong.current].name;
      audio.play();
    } else {
      document.title = "Music App";
      audio.pause();
    }
  } else {
    return
  }
  };

  return (
    <div className="App">
      
      <WelcomeElements
        toggle={toggle}
        setCurrentSong={setCurrentSong}
        audio={audio}
        songs={songs}
        indexOfCurrentSong={indexOfCurrentSong.current}
        currentSong={currentSong}
        setSongs={setSongs}
        albums={albums}
      />
    </div>
  );
}

export default App;
