import passport from 'passport';
import jwt from 'passport-jwt';

import User from '../models/User';

const { ExtractJwt } = jwt;
const JwtStrategy = jwt.Strategy;

// Passport-JWT Options
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN,
};

// Setup PassportJS Strategy for JSON Webtokens
passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
  // only gets called if Token is valid
  try {
    const userRef = await User.findOne({ where: { uuid: jwtPayload.uuid } });
    if (userRef) {
      const user = userRef.get({ plain: true });
      return done(null, user);
    }
    // If no user is found with uuid
    return done(null, false);
  } catch (error) {
    // This should never happen after all :)
    return done(error, false);
  }
}));

export default passport;
