import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
//Components
import Input from "../../Input/Input";
import Select from "../../Select/Select";

//Albums
// import { albums } from "../../../Music/songs";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";

//Style
import "./musicAddForm.css";
import { Playing } from "../../../Context/Playing";

function MusicAddForm() {
  const {albums} = useContext(Playing)
  const [songName, setSongName] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [song, setSong] = useState({});
  const [albumsNameList, setAlbumsNameList] = useState([]);

  const [error, setError] = useState({
    display: false,
    errorMessage: "",
  });

  useEffect(() => {
    const tempo_albumNameList = [];
    albums.forEach((album) => {
      tempo_albumNameList.push(album.name);
    });
    setAlbumsNameList(tempo_albumNameList);
  }, [albums]);

  const handleInputChange = (input, setValue) => {
    setValue(input);
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({
      display: false,
      errorMessage: "",
    });
    if (
      songName === "" ||
      song.name == null ||
      song.type !== "audio/mpeg" ||
      albumName === ""
    ) {
      return setError({
        display: true,
        errorMessage: "Some fields are empty or wrongly filled !",
      });
    }

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
    <div className="musicAddConatainer">
      {error.display && (
        <ErrorMessage errorMessage={error.errorMessage} color={"#F11B45"} />
      )}
      <form
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="musicAdd-form"
      >
        <Input
          handleChange={handleInputChange}
          stateToSet={setSongName}
          placeHolder="Name of the song"
        />
        <Input
          handleChange={handleInputChange}
          type="file"
          stateToSet={setSong}
          placeHolder="Cohiise a mp3 song file"
        />
        <Select options={albumsNameList} stateToSet={setAlbumName} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default MusicAddForm;
