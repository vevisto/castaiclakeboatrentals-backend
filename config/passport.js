import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import passport from 'passport';
import { User } from '../models/user.model.js';
import 'dotenv/config';

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_KEY,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile, "profile");
            try {
                const existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) return done(null, existingUser);

                // Register new user
                const newUser = await User.create({
                    googleId: profile.id,
                    displayName: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    photo: profile.photos?.[0]?.value,
                });

                done(null, newUser);
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});