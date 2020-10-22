import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import DropDownMenu from "../../DropDownMenu/DropDownMenu";

// import { albums } from "../../../Music/songs";
import { Playing } from "../../../Context/Playing";
import ModalContainer from "../../ModalContainer/ModalContainer";
import SearchBar from "../../SearchBar/SearchBar";

import "./albumSelection.css";
import { FillSongs } from "../../../CustomHooks/useFillSongs";
import AddAlbums from "./AddAlbums/AddAlbums";
import AlbumsForm from "./AddAlbums/AlbumsAddingForm/AlbumsForm";
function AlbumsSelection({ show, statusOfMusicPlaying }) {
  const { songs, setSongs, audio, setPlaying, setCurrentSong, albums } = useContext(
    Playing
  );

  const [showAlbumFormModal, setAlbumFormModal] = useState(false);
  const [changeCurrentAlbum, setChangeCurrentAlbum] = useState(false);

  
  //This is needed to convert albums name and function to change album to object for DropMenu.
  const setFirstDropDownOptions = () => {
    const searchedAlbum_Tempo = { All: () => handleAlbumChange("") };
    albums.forEach((albumOption) => {
      searchedAlbum_Tempo[albumOption.name] = () =>
        handleAlbumChange(albumOption.name);
    });
    return searchedAlbum_Tempo;
  };

  const [dropDownOptions, setDropDownOptions] = useState({});

  //काम चलाउ 
  useEffect(() => {
   if(albums[0] != null) {
    setDropDownOptions(() =>
    setFirstDropDownOptions())
   }
  },[albums])

  useEffect(() => {
    if (changeCurrentAlbum) {
      setCurrentSong(songs[0].song);

      document.title = songs[0].album;
      setChangeCurrentAlbum(false);
    }
  }, [changeCurrentAlbum, setCurrentSong, songs, dropDownOptions]);

  const handleSearch = (filteredList) => {
    const searchedAlbum_Tempo = {};
    filteredList.forEach((albumOption) => {
      searchedAlbum_Tempo[albumOption.name] = () =>
        handleAlbumChange(albumOption.name);
    });

    setDropDownOptions(searchedAlbum_Tempo);
  };

  const handleAlbumChange = (albumName) => {
   
    axios
      .get("/api/albumChange", { params: { albumName: albumName } })
      .then((res) => {
        setPlaying(false);
        setSongs(FillSongs(res.data.songsFromAlbum));
        setChangeCurrentAlbum(true);
      });
  };

  const handleModalClose = () => {
    if (!statusOfMusicPlaying) {
      setPlaying(true);
      audio.play();
    }
    setDropDownOptions(setFirstDropDownOptions());
  };

  return (
    <>
      <ModalContainer show={show} closeCallback={handleModalClose}>
        <div className="albumSelection-modal">
          <section className="add-Album">
            <AddAlbums
              showModal={showAlbumFormModal}
              setShowModal={setAlbumFormModal}
            />
          </section>
          <section className="search-section">
            <SearchBar
              callback={handleSearch}
              listToSearchFrom={albums}
              factorToLook="name"
            />
          </section>
          <section className="albums-dropdownoptions">
          <DropDownMenu show={true} options={dropDownOptions} />
          </section>
        </div>
      </ModalContainer>
      <section className="albumFormModal">
        <ModalContainer show={showAlbumFormModal} width="400px" height="400px">
          <AlbumsForm />
        </ModalContainer>
      </section>
    </>
  );
}

export default AlbumsSelection;
