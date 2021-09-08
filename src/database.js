const mongoose = require("mongoose");
require("dotenv").config();

const { HOST_DB, DATABASE } = process.env;
const URI = `mongodb://${HOST_DB}/${DATABASE}`;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("database is connected"))
  .catch((err) => console.log(err));
