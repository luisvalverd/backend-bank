const { Router } = require("express");
const router = Router();
const passport = require('passport');
require('../controllers/controller.auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post("/login", async (req, res, next) => {
	passport.authenticate('login', async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error("An error occurred");
				return next(error);
			}
	
			req.login(user, {session: false}, async (error) => {
				if (error) return next(error);
				const body = {id: user.id, email: user.email};
				const token = jwt.sign({user: body}, process.env.JWTSECRET, {expiresIn: process.env.TOKEN_EXPIRES}); 

				res.status(201).json({token, autorizate: true});
			})
		}catch(e) {
			res.status(400).json(e.messaje);
		}
	})(req, res, next);
});

router.post("/register", passport.authenticate('register', {
	successRedirect: '/api/success',
	failureRedirect: '/error',
	passReqToCallback: true
}));

router.get("/success", (req, res)=> {
	res.json({messaje: 'logged'})
})

module.exports = router;
