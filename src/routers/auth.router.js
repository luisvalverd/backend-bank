const { Router } = require("express");
const router = Router();
const passport = require('passport');
require('../controllers/controller.auth');

router.post("/login", passport.authenticate('login', {
	successMessage: 'ok',
	failureMessage: 'fail',
	passReqToCallback: true
}));

router.post("/register", (req, res) => {
	res.json({message: "ok"});
});

module.exports = router;
