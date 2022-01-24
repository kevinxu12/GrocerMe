/**
 * @file Initializes Google passport OAuth Strategy for the project. This file should be the main file for any OAuth strategies
 * @author Kevin Xu
 */
import passport from 'passport';
import { RoleCode } from '@src/models/Role';
import { BadRequestError } from '@src/core/ApiError';
import UserRepo from '@src/repository/UserRepo';
import User from '@src/models/User';
import { Types } from 'mongoose';
import { Profile } from 'passport-google-oauth20';
import { google } from '@src/config';
import { logger } from '@src/app';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const DEFAULT_ROLE = RoleCode.CONSUMER;

logger.info('Initializing passport');

export type parsedGoogleProfile = {
  googleId: string;
  name: string;
  email: string;
  provider: string;
};

/**
 *
 * @param {Object} profile Helper
 * @returns { Object} Object
 */
function parseProfile(profile: Profile): parsedGoogleProfile | null {
  const { id, displayName, emails, provider } = profile;
  if (emails && emails.length) {
    const email = emails[0].value;
    return { googleId: id, name: displayName, email, provider };
  }
  return null;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: google.client_id,
      clientSecret: google.client_secret,
      callbackURL: 'http://localhost:8080/api/google/callback',
    },
    //  Passport verify callback
    async (
      request: any,
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: (error: string | null, user: User | null) => void,
    ) => {
      const parsedProfile = parseProfile(profile);
      if (!parsedProfile) {
        throw new BadRequestError('Profile not parsed');
      }
      const existingEmailUser = await UserRepo.findByEmail(parsedProfile.email);
      // Create user if he is not registered already
      if (existingEmailUser) {
        return done(null, existingEmailUser);
      }
      logger.info(`Creating a new user with email ${parsedProfile.email}`);
      const newUser = await UserRepo.create(
        {
          name: parsedProfile.name,
          email: parsedProfile.email,
        } as User,
        DEFAULT_ROLE,
      );
      return done(null, newUser);
    },
  ),
);
// Saves user's ID to a session
passport.serializeUser((user: User, done) => {
  done(null, user._id);
});
// Retrieve user's ID from a session
passport.deserializeUser((id: Types.ObjectId, done) => {
  UserRepo.findById(id).then((user) => {
    done(null, user);
  });
});
