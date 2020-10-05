require("dotenv/config");
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

const uploadSong = require("./api/songUpload");
const songsData = require("./api/songsData");
const albumChange = require("./api/albumChange");

//Database Connection
mongoose.connect(
  process.env.DATABASE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (e) => {
    if (e) {
      console.log("Problem connecting with Database");
    } else {
      console.log("Connected with Mongoose DB");
    }
  }
);

//Midwares
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

//Routes
app.use("/api", uploadSong);
app.use("/api", songsData);
app.use("/api", albumChange);

//Server INIT
app.listen(PORT, (e) => {
  if (e) {
    console.log("Failed to run Server");
  } else {
    console.log(`Server running at PORT ${PORT}`);
  }
});
