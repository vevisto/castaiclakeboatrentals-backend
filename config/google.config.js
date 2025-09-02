import express from "express";
import session from 'express-session';
import './passport.js'
import passport from "passport";
import { User } from "../models/user.model.js";
import MongoStore from 'connect-mongo';

const app = express();

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.get(
    '/auth/google',
    passport.authenticate(
        'google',
        {
            scope: [
                'profile',
                'email',
            ]
        }));



app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login?error=auth_failed' }),
    (req, res) => {
        res.redirect('http://localhost:3000');
    }
);



app.get('/api/auth/me', (req, res) => {
    if (req.user) {
        res.json({
            id: req.user.googleId || req.user.id,
            name: req.user.displayName || req.user.name,
            email: req.user.emails?.[0]?.value || req.user.email,
            avatar: req.user.photos?.[0]?.value || req.user.avatar
        });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

async function authenticateUser(email, password) {
    // This is where you'd check against your database
    // For demo purposes, returning a mock user
    if (email === 'demo@example.com' && password === 'password') {
        return {
            id: 1,
            name: 'Demo User',
            email: 'demo@example.com',
            avatar: null
        };
    }
    return null;
}



app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Your regular email/password authentication logic here
        // For demo purposes, we'll simulate a successful login
        const user = await authenticateUser(email, password); // Implement this function

        if (user) {
            req.login(user, (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Login failed' });
                }
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar
                });
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
});


passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user));
});
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});



export default app;