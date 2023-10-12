const passport = require("./utils/passportUtils");

// Middleware to check if user is authenticated
module.exports = {
    isStudentAuthenticated: (req, res, next)=> {
        if (req.isAuthenticated() && req.user && req.user.role === 'student') {
            return next();
        }
        res.redirect('/student-login');
    },
    
    preventStudentLoginAccess: (req, res, next)=> {
        if (req.isAuthenticated() && req.user && req.user.role === 'student') {
            return res.redirect('/student-dashboard');
        }
        next();
    }
}
