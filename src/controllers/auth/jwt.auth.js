const JWTstrategy = require('passport-jwt').Strategy;
const ExtactJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
require('dotenv').config();

passport.use(new JWTstrategy({
    secretOrKey: process.env.JWTSECRET,
    jwtFromRequest: ExtactJWT.fromUrlQueryParameter('secret_token') 
}, async (token, done) => {
    try{
        return done(null, token.user);
    } catch (error) {
        done(error);
    }
}
));


