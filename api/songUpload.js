const express = require("express");
const route = express();

route.post("/uploadSong", (req, res) => {
  const uploadedSong = req.files.song;

  if (uploadedSong == null) {
    return res.status(500).send("File Not Fould");
  }

  uploadedSong.mv(`public/${uploadedSong.name}`, (err) => {
    if (err) {
      console.log("Error" + err);
      res.status(500).send("Error");
    } else {
      console.log("Success");
      res.status(200).send("Success");
    }
  });
});

module.exports = route;
