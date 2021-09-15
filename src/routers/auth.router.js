const { Router } = require("express");
const router = Router();
const passport = require('passport');
require('../controllers/controller.auth');

router.post("/login", passport.authenticate('login', {
	successRedirect: '/success',
	failureRedirect: '/error',
	passReqToCallback: true
}));

router.post("/register", passport.authenticate('register', {
	successRedirect: '/success',
	failureRedirect: '/error',
	passReqToCallback: true
}));

module.exports = router;
