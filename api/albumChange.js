const express = require("express");
const SongsData = require("../models/songsData");

const router = express();

router.get("/albumChange", async (req, res) => {
  const albumName = req.query.albumName;
  const songsLIstToSend = await SongsData.find({ album: albumName });

  res.status(200).json({ songsFromAlbum: songsLIstToSend });
});

module.exports = router;
