const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json({ msg: "Hi There" });
});

app.listen(PORT, (e) => {
  if (e) {
    console.log("Failed to run Server");
  } else {
    console.log(`Server running at PORT ${PORT}`);
  }
});
