const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
// const flash = require('express-flash');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const pool = require('../database');
// app.use(flash());
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false, // Set to true if using HTTPS
//         maxAge: 30 * 24 * 60 * 60 * 1000 // Session duration in milliseconds (30 days)
//     }
// }))
// app.use(passport.initialize());
// app.use(passport.session());

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        
        if (!rows.length) {
            return done(null, false, { message: 'Email not found' });
        }
        
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        const hash = await bcrypt.hash("password", 10)
        console.log(hash)
  
        if (isMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Password incorrect' });
        }
    } catch (err) {
        return done(err);
    }
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
        const [rows] = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
        done(null, rows[0]);
    } catch (err) {
        done(err);
    }
  });

  module.exports = passport;