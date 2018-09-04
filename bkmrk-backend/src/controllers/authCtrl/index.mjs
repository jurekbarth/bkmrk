import passport from 'passport';
import jsonwebtoken from 'jsonwebtoken';

// Middleware to add user to the req object
export const jwt = (req, res, next) =>
  passport.authenticate('jwt', (error, user, info) => {
    if (error) {
      return next(error);
    }
    if (!user) {
      return next();
    }
    req.user = user;
    return next();
  })(req, res, next);

export const isLoggedIn = (req, res) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
};

// Generate the JWT
// 5184000 -> 60 days
export const issueJwt = uuid =>
  jsonwebtoken.sign({ uuid, exp: Math.floor(Date.now() / 1000) + 5184000 }, process.env.JWT_TOKEN);
