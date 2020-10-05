import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import DropDownMenu from "../../DropDownMenu/DropDownMenu";

import { albums } from "../../../Music/songs";
import { Playing } from "../../../Context/Playing";
import ModalContainer from "../../ModalContainer/ModalContainer";
import SearchBar from "../../SearchBar/SearchBar";

import "./albumSelection.css";
import { FillSongs } from "../../../CustomHooks/useFillSongs";
function AlbumsSelection({ show, statusOfMusicPlaying }) {
  const { songs, setSongs, audio, setPlaying, setCurrentSong } = useContext(
    Playing
  );
  // const [albSongs, setAlbSongs] = useState([]);
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

  const [dropDownOptions, setDropDownOptions] = useState(() =>
    setFirstDropDownOptions()
  );

  //

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
    console.log(albumName);
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
          <section className="search-section">
            <SearchBar
              callback={handleSearch}
              listToSearchFrom={albums}
              factorToLook="name"
            />
          </section>
          <DropDownMenu show={true} options={dropDownOptions} />
        </div>
      </ModalContainer>
    </>
  );
}

export default AlbumsSelection;
