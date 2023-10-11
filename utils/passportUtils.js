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


  // Admin Local Strategy
passport.use('admin-local', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
        const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        
        if (!rows.length) {
            return done(null, false, { message: 'Please, input the correct credentials' });
        }
        
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (isMatch) {
          user.role = 'admin';
            return done(null, user );
        } else {
            return done(null, false, { message: 'Please, input the correct credentials' });
        }
    } catch (err) {
        return done(err);
    }
  }));

  // Student Local Strategy
passport.use('student-local', new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const [rows] = await pool.query('SELECT * FROM students WHERE username = ?', [email]);
  
        if (!rows.length) {
          return done(null, false, { message: 'Please, input the correct credentials' });
        }
  
        const user = rows[0];
  
        if (password === user.password) {
          user.role = 'student'; // Set the role as 'student'
          return done(null, user);
        } else {
          return done(null, false, { message: 'Please, input the correct credentials' });
        }
      } catch (err) {
        return done(err);
      }
    }
  ));
  

  // Serialize and Deserialize Functions
  passport.serializeUser((user, done) => {
    // Serialize the user based on their role (admin or student)
    done(null, { id: user.id, role: user.role });
  });
  
  passport.deserializeUser(async (serializedUser, done) => {
    try {
      const { id, role } = serializedUser;
  
      let user;
      if (role === 'student') {
        const [studentRows] = await pool.query('SELECT * FROM students WHERE id = ?', [id]);
        user = studentRows[0];
      } else if (role === 'admin') {
        const [adminRows] = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
        user = adminRows[0];
      }
  
      if (user) {
        return done(null, user);
      }
  
      return done(null, null);
    } catch (err) {
      return done(err);
    }
  });


  module.exports = passport;