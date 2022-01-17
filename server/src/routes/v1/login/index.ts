/**
 * @file Router home page for all login related routes
 * @author Kevin Xu
 */
import express from 'express';
import passport from 'passport';
import generateClientUrl from './../../../helpers/url';
import { SuccessResponse } from './../../../core/ApiResponse';
import User from './../../../models/User';

// authenticate passport
require('./../../../auth');

const router = express.Router();

// This route begins the authentication sequence by redirecting the user to
//    Google.
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
);

/*
    This route completes the authentication sequence when Google redirects the
    user back to the application.  When a new user signs in, a user account is
    automatically created and their Google account is linked.  When an existing
    user returns, they are signed in to their linked account.
*/
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: generateClientUrl('/'),
  }),
  function (req, res) {
    res.redirect(generateClientUrl('/dashboard'));
    res.end();
  },
);

/* POST /logout
 *
 * This route logs the user out.
 */
router.get('/logout', function (req, res) {
  console.log('calling logout');
  req.session = null;
  req.logout();
  res.end();
});

/**
 * Checks if a user is currently loggedin
 * Returns the logged in user object if so
 */
router.get('/loggedIn', function (req, res) {
  new SuccessResponse<User | null>('User Sign in result', req.user as User).send(res);
});

export default router;
