const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const router = require("./routers/index.router");
require("./database");

// settings
app.set("port", process.env.PORT);

// middlewares
app.use(morgan("dev"));

// routers
app.use("/api", router);

// initialization
app.listen(app.get("port"), () => {
  console.log(`listen on port ${app.get("port")}`);
});
