const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use('login', new LocalStrategy( {
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	}, async (req, username, password, done) => {
		console.log(req.body.email);
		console.log(password);		
	}
));



