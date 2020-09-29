import React from "react";

//Style
import "./songCards.css";

function SongCards({ name, isPlaying, album }) {
  return (
    <div className="songCards">
      <img src={album.img} className="coverImage" alt="" />
      {isPlaying && (
        <div className="playingSong">
          <span>Playing</span>
        </div>
      )}
      <div className="overlay">
        <section className="songName">{name}</section>
        <section className="songArtist">
          {album != null ? album.artist : ""}
        </section>
        <section className="songAlbum">
          {album != null ? album.name : ""}
        </section>
      </div>
    </div>
  );
}

export default SongCards;
