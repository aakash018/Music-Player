const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = 5000;

const uploadSong = require("./api/songUpload");

app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(express.static(__dirname + "public"));
app.use(fileUpload());

app.use("/api", uploadSong);

app.listen(PORT, (e) => {
  if (e) {
    console.log("Failed to run Server");
  } else {
    console.log(`Server running at PORT ${PORT}`);
  }
});
