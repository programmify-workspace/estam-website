const passport = require("./utils/passportUtils");

// Middleware to check if user is authenticated

module.exports = {
    isStudentAuthenticated: function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/student-login');
      },
      
      // Middleware to prevent access to login page for authenticated users
    preventStudentLoginAccess:  function preventLoginAccess(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect('/student-dashboard');
        }
        next();
      }
}
