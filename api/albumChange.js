const express = require("express");
const SongsData = require("../models/songsData");

const router = express();

router.get("/albumChange", async (req, res) => {
  const albumName = req.query.albumName;
  let songsListToSend;
  
  if(albumName.trim() === ""){
    songsListToSend = await SongsData.find();
  } else {
  songsListToSend = await SongsData.find({ album: albumName });
  }
  
  res.status(200).json({ songsFromAlbum: songsListToSend });
});

module.exports = router;
