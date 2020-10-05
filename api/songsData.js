const express = require("express");

const router = express();
const SongsData = require("../models/songsData");

router.get("/songsData", async (req, res) => {
  const songsData = await SongsData.find();
  res.json(songsData);
});

module.exports = router;
