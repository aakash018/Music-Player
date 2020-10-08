import { useState, useEffect } from "react";

import Axios from "axios";

// function importAll(r) {
//   return r.keys().map(r);
// }

// const images = importAll(require.context("../Music", false, /\.(mp3)$/));

export function useGetSongs() {
  const [songsFromGroup, setSongsFromGroup] = useState([]);

  useEffect(() => {
    function importAll(r) {
      return r.keys().map(r);
    }

    const images = importAll(require.context("../Music", false, /\.(mp3)$/));

    function fillSong(songData) {
      const requiredSongName = images.filter((name) => {
        return name.slice(14).split(".")[0] === songData.name;
      });
      songData.song = requiredSongName[0];

      return songData;
    }

    Axios.get("/api/songsData").then((res) => {
      const songs_tempo = [];
      res.data.forEach((data) => {
        songs_tempo.push(fillSong(data));
      });
      setSongsFromGroup(songs_tempo);
    });
  }, []);

  return [songsFromGroup, setSongsFromGroup];
}
