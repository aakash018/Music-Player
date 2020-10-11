const mongoose = require("mongoose");

const albumsDataSchema = new mongoose.Schema({
  name: String,
  artist: String,
});

module.exports = mongoose.model("AlbumsData", albumsDataSchema);
