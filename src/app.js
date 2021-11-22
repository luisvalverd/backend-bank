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
const cors = require('cors');
const User = require('./models/user');
const profile = require('./routers/protected.router');

// settings
app.set("port", 3000 || process.env.PORT);

// middlewares

app.use(morgan("dev"));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true}));
app.use(session({
	secret: 'thinks',
	resave: true,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routers
app.use("/api", router);
app.use('/api', routerAuth);
app.use('/api', passport.authenticate('jwt', { session: false }) ,profile);

// initialization
app.listen(app.get('port'), () => {
  console.log(`listen on port ${app.get("port")}`);
});
