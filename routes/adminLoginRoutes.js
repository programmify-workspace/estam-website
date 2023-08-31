const express = require('express')
const router = express.Router()
const passport = require("../utils/passportUtils");

const {isAuthenticated, preventLoginAccess} = require("../authenticate-admin");

router.get("/admin-login", preventLoginAccess, (req, res) => {
    res.render('admin-login', { 
        messages: {
            error: req.flash('error')[0]  // Get the first error message, if any
        }
    });
});

router.post('/admin-loging-in', passport.authenticate('local', {
    successRedirect: '/admin-dashboard',
    failureRedirect: '/admin-login',
    failureFlash: true
  }));
  
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