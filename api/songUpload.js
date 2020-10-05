const express = require("express");
const route = express();

const SongsData = require("../models/songsData");

route.post("/uploadSong", async (req, res) => {
  const uploadedSong = req.files.song;
  const songName = req.body.name;
  try {
    if (uploadedSong == null) {
      return res.status(500).send("File Not Fould");
    }

    if (uploadedSong.mimetype !== "audio/mpeg") {
      res.send("Only mp3 type is supported");
      throw "Only mp3 type is supported";
    }

    uploadedSong.mv(`client/src/Music/${songName}.mp3`, (err) => {
      if (err) {
        console.log("Error" + err);
        res.status(500).send("Error");
      } else {
        console.log("Success");
        res.status(200).send("Success");
      }
    });

    const songData = new SongsData({
      name: req.body.name,
      album: req.body.album,
    });
    await songData.save();
  } catch (e) {
    console.log("Error " + e);
  }
});

module.exports = route;
