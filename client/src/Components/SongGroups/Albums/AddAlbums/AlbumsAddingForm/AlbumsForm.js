import React, { useState } from "react";
import axios from "axios"

//Components
import Input from "../../../../Input/Input";

function AlbumsForm() {
  const [albumName, setAlbumName] = useState("");
  const [albumArtistName, setAlbumArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState({});

  const handleChange = (input, stateToSet) => {
    stateToSet(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const data = new FormData()
    data.append("name", albumName)
    data.append("albumCover", albumCover)
    data.append("artist", albumArtistName)


    axios.post("/api/albumsData", data, {
      onUploadProgress: (ProgressEvent) => {
        let progress =
        Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100) +
        "%";
      console.log(progress);
      }
    })
    .then((res) => console.log(res.data))
    .catch(console.log("Error"));
  };

  return (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <Input
          type="text"
          stateToSet={setAlbumName}
          handleChange={handleChange}
          placeHolder="Name of the Album"
        />
        <Input
          type="text"
        stateToSet={setAlbumArtistName}
          handleChange={handleChange}
          placeHolder="Name of the Artist"
        />
        <Input
          type="file"
          stateToSet={setAlbumCover}
          handleChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AlbumsForm;
