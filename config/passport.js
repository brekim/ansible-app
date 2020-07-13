/* eslint-disable prettier/prettier */
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require('bcrypt');
var JWTStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var User = require("../models/user");
var settings = require("../config/settings"); 

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = settings.secret;
  passport.use(new LocalStrategy({
    usernameField: User.username,
    passwordField: User.password,
  }, async (username, password, done) => {
    try {
      const userDocument = await User.findOne({username: username}).exec();
      const passwordsMatch = await bcrypt.compare(password, userDocument.passwordHash);
  
      if (passwordsMatch) {
        return done(null, userDocument);
      } else {
        return done('Incorrect Username / Password');
      }
    } catch (error) {
      done(error);
    }
  }));
  passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: settings.secret,
  },
    (jwtPayload, done) => {
      if (Date.now() > jwtPayload.expires) {
        return done('jwt expired');
      }

      return done(null, jwtPayload);
    }
  ));
};
