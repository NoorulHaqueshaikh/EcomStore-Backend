// backend/config/passport.js

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const User = require("../models/users"); // make sure your file is 'users.js'

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // check if user exists
        let user = await User.findOne({ email });
        console.log("user exists",user)
        // console.log("user exists:",user)
        // if user doesn't exist, create a new one
        if (!user) {
          usercreated = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: email,
          });
          console.log("user created", usercreated)
        //   console.log("user created:", usercreated)
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
