import React, { useEffect, useState } from "react";
import axios from "axios";
//Components
import Input from "../../Input/Input";
import Select from "../../Select/Select";

//Albums
import { albums } from "../../../Music/songs";

function MusicAddForm() {
  const [songName, setSongName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [song, setSong] = useState({});
  const [albumsNameList, setAlbumsNameList] = useState([]);

  useEffect(() => {
    const tempo_albumNameList = [];
    albums.forEach((album) => {
      tempo_albumNameList.push(album.name);
    });
    setAlbumsNameList(tempo_albumNameList);
  }, []);

  const handleInputChange = (input, setValue) => {
    setValue(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", songName);
    data.append("song", song);
    data.append("album", albumName);

    axios
      .post("/api/uploadSong", data, {
        onUploadProgress: (ProgressEvent) => {
          let progress =
            Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
            "%";
          console.log(progress);
        },
      })
      .then((res) => console.log(res.data))
      .catch(console.log("Error"));
  };
  return (
    <div>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <Input handleChange={handleInputChange} stateToSet={setSongName} />
        <Input
          handleChange={handleInputChange}
          type="file"
          stateToSet={setSong}
        />
        <Select options={albumsNameList} stateToSet={setAlbumName} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MusicAddForm;
