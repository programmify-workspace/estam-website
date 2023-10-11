const passport = require("./utils/passportUtils");

// Middleware to check if user is authenticated

module.exports = {
    isAuthenticated: function isAuthenticated(req, res, next) {
        if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
            return next();
        }
        res.redirect('/admin-login');
      },
      
      // Middleware to prevent access to login page for authenticated users
    preventLoginAccess:  function preventLoginAccess(req, res, next) {
        if (req.isAuthenticated() && req.user && req.user.role === 'admin') {
            return res.redirect('/admin-dashboard');
        }
        next();
      }
}
