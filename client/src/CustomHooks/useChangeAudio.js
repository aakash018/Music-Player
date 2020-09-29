import { useState, useEffect } from "react";

export function useChangeAudio(initialAudio, indexOfCurrentSong, songs) {
  const [currentSong, setCurrentSong] = useState({
    song: initialAudio,
    play: false,
  });

  const audio = new Audio(currentSong.song);

  for (let song of songs) {
    if (song.song === currentSong.song) {
      indexOfCurrentSong.current = songs.indexOf(song);
      localStorage.setItem("-music-app-key", indexOfCurrentSong.current);
      break;
    }
  }

  useEffect(() => {
    console.log(currentSong);
    if (currentSong.play) {
      audio.pause();

      audio.load();
      audio.play();
      setCurrentSong({ song: currentSong.song, play: false });
    }
  }, [currentSong]);

  return [audio, currentSong.song, setCurrentSong];
}
