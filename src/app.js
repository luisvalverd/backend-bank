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
const passport = require('passport');
const flash = require('connect-flash');

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
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routers
app.use("/api", router);
app.use('/api', routerAuth);

// routers errors
app.get('/error', (req, res, next) => {
	res.json({message: req.flash('error'), fail: true});
});

app.get('/success', (req, res, next) => {
	res.json({message: req.flash('success'), fail: false});
});


// initialization
app.listen(app.get("port"), () => {
  console.log(`listen on port ${app.get("port")}`);
});
