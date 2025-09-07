//


import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "http://localhost:2001/auth/google/callback",
        },
        function (accessToken, refreshToken, profile, done) {
            // Ici tu peux créer ou récupérer l’utilisateur dans ta DB
            return done(null, { profile, accessToken });
        }
    )
);

passport.serializeUser((user: any, done) => done(null, user));
passport.deserializeUser((user: any, done) => done(null, user));

export default passport;
