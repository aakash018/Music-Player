const mongoose = require("mongoose");

const songsDataSchema = new mongoose.Schema({
  name: String,
  album: String,
});

module.exports = mongoose.model("SongsData", songsDataSchema);
