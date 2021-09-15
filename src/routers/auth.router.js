const { Router } = require("express");
const router = Router();
const passport = require('passport');
require('../controllers/controller.auth');


router.post("/login", passport.authenticate('login', {
	successRedirect: '/api/users',
	failureMessage: 'failed to login user',
	passReqToCallback: true
}));

router.post("/register", passport.authenticate('register', {
	successRedirect: '/api/users',
	failureMessage: 'failed to register user',
	passReqToCallback: true
}));

module.exports = router;
