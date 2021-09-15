const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const {compareIds} = require('./controller.user');

passport.use('login', new LocalStrategy( {
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	}, async (req, username, password, done) => {
		User.findOne({email: username}, (err, user) => {
			if(user) {
				if (password === user.password) {
					return done(null, user);
				}
				return done(null, false);
			}
		}); 
	}
));

passport.use('register', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true,
	}, async (req, username, pass, done) => {
		const {firts_name, last_name,money,  email, type_credit_card, credit_card, password, gender} = req.body;	
		User.findOne({email: username}, async (err, user) => {
			let id = await compareIds(Math.floor(Math.random() * 10000));
			if (!user) {
				if ( firts_name !== '' && last_name !== '' && email !== '' && type_credit_card !== '' && credit_card !== '' && password !== '' && gender !== '') {
					if (password === req.body.confirmPassword) {
						const newUser = await new User({
							id,
							firts_name,
							last_name,
							email,
							money,
							type_credit_card,
							credit_card,
							password,
							gender,
						});
						await newUser.save();
						return done(null, newUser);
					}
					return done(null, false);
				}
				return done(null, false);
			}
			return done(null, false);
		});
	}
));

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	console.log(id);
	User.findOne({id}, (err, user) => {
		done(null, user);
	});
});

