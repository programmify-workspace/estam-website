const express = require('express')
const router = express.Router()
const passport = require("../utils/passportUtils");

const {isAuthenticated, preventLoginAccess} = require("../authenticate-admin");

router.get("/admin-login", preventLoginAccess, (req, res) => {
    // const providedEmail = req.body.email;
    res.render('admin-login', { 
        messages: {
            error: req.flash('error')[0]  // Get the first error message, if any
        },
        email: req.flash('email')[0],
        password: req.flash('password')[0],
    });
});

router.post('/admin-loging-in', (req, res, next) => {
    passport.authenticate('admin-local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Flash the entered email so it can be displayed on the login page
            req.flash('email', req.body.email);
            req.flash('password', req.body.password);
            // Flash the error message
            req.flash('error', info.message);
            return res.redirect('/admin-login');
        }
        // If authentication is successful, log in the user
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/admin-dashboard');
        });
    })(req, res, next);
});
  
router.get('/admin-logout', (req, res) => {
req.logout((err)=>{
    if(err){
    console.log(err);
    res.redirect('/admin-dashboard')
    }
    res.redirect('/admin-login');
}); // This function is provided by Passport to terminate the login session

});


module.exports = router;