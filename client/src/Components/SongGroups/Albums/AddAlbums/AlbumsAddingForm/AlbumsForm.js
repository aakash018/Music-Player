import React, { useState } from "react";
import axios from "axios"

//Components
import Input from "../../../../Input/Input";
import Error from "../../../../ErrorMessage/ErrorMessage"
import DefultButtons from "../../../../DefultButtons/DefultButtons";


function AlbumsForm() {

  const style = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  
  }

  const styleForm = {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    height: "100%",
    justifyContent: "space-evenly",
  }

  const [albumName, setAlbumName] = useState("");
  const [albumArtistName, setAlbumArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState({});

  const [error, setError] = useState({
    display: false,
    errorMessage: ""
  })

  const handleChange = (input, stateToSet) => {
    stateToSet(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({
      display: false,
      errorMessage: ""
    })
    
    if(
      albumName === "" ||
      albumCover === null ||
      albumArtistName === "" 
    ) {
      return setError({
        display: true,
        errorMessage: "Sorry Forms Not Filled Correctly"

      })
    }

    if (
      albumCover.type === "image/jpeg" ||
      albumCover.type === "image/png" ||
      albumCover.type === "image/jpg"
    ) {
      

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

    } else {
      return setError({
        display: true,
        errorMessage: "Wrong type of image. Use JPEG or PNG"
      })
    }


  };

  return (
    <div className="albumsAddingContianer" style={style}>
      <section className="albumAdding-error-container">
        {error.display && <Error errorMessage={error.errorMessage} fontSize="1.2rem" color={"#F11B45"}/>}
      </section>
      <form onSubmit={handleSubmit} encType="multipart/form-data" style={styleForm}>
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
        <DefultButtons type={"submit"} lable="Submit"/>
      </form>
    </div>
  );
}

export default AlbumsForm;
