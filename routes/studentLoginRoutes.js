const express = require('express')
const router = express.Router()
const passport = require("../utils/passportUtils");

const {isStudentAuthenticated, preventStudentLoginAccess} = require("../authenticate-student");

router.get("/student-login", preventStudentLoginAccess, (req, res) => {
    // const providedEmail = req.body.email;
    res.render('student-login', { 
        messages: {
            error: req.flash('error')[0]  // Get the first error message, if any
        },
        email: req.flash('email')[0],
        password: req.flash('password')[0],
    });
});

router.post('/student-loging-in', passport.authenticate('student-local', {
  successRedirect: '/student-dashboard',
  failureRedirect: '/student-login',
  failureFlash: true
}));

// router.post('/student-loging-in', (req, res, next) => {
//     passport.authenticate('student-local', (err, user, info) => {
//         if (err) {
//             return next(err);
//         }
//         if (!user) {
//             // Flash the entered email so it can be displayed on the login page
//             req.flash('email', req.body.email);
//             req.flash('password', req.body.password);
//             // Flash the error message
//             req.flash('error', info.message);
//             return res.redirect('/student-login');
//         }
//         // If authentication is successful, log in the user
//         req.logIn(user, (err) => {
//             if (err) {
//                 return next(err);
//             }
//             return res.redirect('/student-dashboard');
//         });
//     })(req, res, next);
// });
  
router.get('/student-logout', (req, res) => {
req.logout((err)=>{
    if(err){
    console.log(err);
    res.redirect('/student-dashboard')
    }
    res.redirect('/student-login');
}); // This function is provided by Passport to terminate the login session

});


module.exports = router;