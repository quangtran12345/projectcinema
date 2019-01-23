const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./properties')
const User = require('../api/model/User')
const jwt = require('jsonwebtoken')
const userController = require('../api/controller/userController')
function createPassportConfig(app) {
  passport.use(new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: "http://localhost:3000/api/user/google/callback",
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, done) => {
    console.log(profile)
    User.findOne({ email: profile.emails[0].value }, async function (err, user) {
      if (err) { return done(err) }
      if (user) {
        var token = jwt.sign({ email: profile .emails[0].value }, keys.constant.secretCode)
        req.session.token = token
        return done(null, true, {
          user: user,
          token: token
        })
      }
      if (!user) {
        let newUser = {
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          image: profile.photos[0].value,
        }
        let user1 = new User(newUser)
        let dataReturn = userController.createUser(user1)
        var token = jwt.sign({ email: profile.emails[0].value }, keys.constant.secretCode)
        req.session.token = token
        done(null, user1, dataReturn)
      }
    })
  }
  ))

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  })

  app.use(passport.initialize())
  app.use(passport.session())
}
module.exports = {
  createPassportConfig: createPassportConfig,
  passport: passport
}