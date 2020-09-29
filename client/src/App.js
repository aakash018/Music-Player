import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

//Componenets
import WelcomeElements from "./Components/WelcomeElements/welcomeElements";

import "./App.css";
import { useGetSongs } from "./CustomHooks/useGetSongs";

function App() {
  // function importAll(r) {
  //   // console.log(r.keys()[0].slice(2).split("_"));
  //   return r.keys().map(r);
  // }

  // const images = importAll(require.context("./", false, /\.(mp3)$/));

  useEffect(() => {
    axios
      .get("/api/data")
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  });

  let indexOfCurrentSong = useRef(localStorage.getItem("-music-app-key") || 0);

  const [songs, setSongs] = useGetSongs();

  const [currentSong, setCurrentSong] = useState(() => {
    if (songs[indexOfCurrentSong.current] != null) {
      return songs[indexOfCurrentSong.current].song;
    } else {
      return songs[0].song;
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
    if (audio.paused) {
      document.title = songs[indexOfCurrentSong.current].name;
      audio.play();
    } else {
      document.title = "Music App";
      audio.pause();
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
      />
    </div>
  );
}

export default App;
