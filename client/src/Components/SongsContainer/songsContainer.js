import React, { useEffect, useState, useContext } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

//Components
import SongCards from "../SongCards/songCards";
import SearchBar from "../SearchBar/SearchBar";
import RoundButtons from "../RoundButtons/roundButtons";

//Icons
import MdSearch from "react-ionicons/lib/MdSearch";

//Style
import "./songsContainer.css";
import { Playing } from "../../Context/Playing";
// import { albums } from "../../Music/songs";
import useGetScrollPositon from "../../CustomHooks/useGetScrollPosition";

function SongsContainer({ songs, setCurrentSong, audio }) {
  const [playChosedSong, setPlayChosedSong] = useState(false);
  const { setPlaying, currentSong, playing, albums} = useContext(Playing);
  
  const indexofCurrentSong = localStorage.getItem("-music-app-key");

  const [songsForCards, setSongsForCards] = useState(songs);
  const [searchSlider, setSearchSlider] = useState(false);

  const topPosition = useGetScrollPositon();

  useEffect(() => {
    if (playChosedSong) {
      audio.load();
      audio.play();
      setPlayChosedSong(false);
    }
  }, [playChosedSong, audio]);

  useEffect(() => {
    setSongsForCards(songs);
  }, [songs]);

  const handleSongChange = (song) => {
    audio.pause();
    setPlayChosedSong(true);
    setCurrentSong(song);
    setPlaying(true);
  };

  const handleFindAlbum = (songAlbum) => {
    return albums.find((album) => {
      return album.name === songAlbum;
    });
  };

  const handleSearch = (filteredList) => {
    setSongsForCards(filteredList);
  };

  const handleSearchClick = () => {
    setSearchSlider((prevState) => !prevState);
  };

  return (
    <div className="songsContainer">
      <div
        className={
          topPosition > 80 ? "searchSongContainer show" : "searchSongContainer"
        }
      >
        <section
          className={
            !searchSlider
              ? "search-songsContainer"
              : "search-songsContainer show"
          }
        >
          <section className="search-songsContainer-icon">
            <RoundButtons
              text={<MdSearch color="white" />}
              width="20px"
              height="20px"
              backgroundColor="#00000000"
              handleClick={handleSearchClick}
            />
          </section>
          <SearchBar
            listToSearchFrom={songs}
            factorToLook="name"
            callback={handleSearch}
          />
        </section>
      </div>
      <ScrollContainer className="songWraper">
        {songsForCards.map((song, index) => (
          <div
            key={song._id}
            onClick={() => {
              handleSongChange(song.song);
            }}
          >
            {albums[0] != null && 
            <SongCards
              name={song.name}
              isPlaying={
                (currentSong === song.song ||
                  index === parseInt(indexofCurrentSong)) &&
                playing
              }
              album={handleFindAlbum(song.album)}
            />
            }
          </div>
        ))}
      </ScrollContainer>
    </div>
  );
}

export default SongsContainer;
