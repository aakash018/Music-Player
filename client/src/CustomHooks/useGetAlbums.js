import { useState, useEffect } from "react";

import Axios from "axios"

export function useGetAlbums() {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    function importAll(r) {
      return r.keys().map(r);
    }

    const images = importAll(require.context("../Music/albumCovers", false, /\.(jpeg)$/));

    function fillSong(songData) {
      const requiredSongName = images.filter((name) => {
        
        return name.slice(14).split(".")[0] === songData.name;
      });
      songData.img = requiredSongName[0];

      return songData;
    }

    Axios.get("/api/getAlbumsData").then((res) => {
      const albums_tempo = [];
      res.data.forEach((data) => {
        albums_tempo.push(fillSong(data));
      });
      setAlbums(albums_tempo)
    });
  }, []);

  return [albums, setAlbums]
}
