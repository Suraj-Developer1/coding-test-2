const mongoose = require("mongoose");

const app = require("./app");

var url = "mongodb://localhost:27017/pets";
mongoose
  .connect(url)
  .then(() => {
    console.log("connection successfull");
  });

app.listen(8000, () => {
  console.log("listening server 8000");
});
