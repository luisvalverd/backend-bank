const express = require("express");
require("dotenv").config();
const app = express();
const morgan = require("morgan");
const router = require("./routers/index.router");
require("./database");
const routerAuth = require('./routers/auth.router');
const {urlencoded, json} = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// settings
app.set("port", 3000 || process.env.PORT);

// middlewares
app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(session({
	secret: 'thinks',
	resave: true,
	saveUninitialized: true,
}));

// routers
app.use("/api", router);
app.use('/api', routerAuth);

// initialization
app.listen(app.get("port"), () => {
  console.log(`listen on port ${app.get("port")}`);
});
