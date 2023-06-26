import pool from "../database.js";

// Configure Form Submission endpoints
const handleSubmitLogin = (req, res) => {
  const { email, password } = req.body;

  pool.query('SELECT * FROM students WHERE email = ?', [email], (error, results) => {
    if (error) throw error;

    if (results.length === 1) {
      const student = results[0];

      bcrypt.compare(password, student.password, (err, result) => {
        if (result) {
          req.session.id = student.id;
          res.redirect('/admin');
        } else {
          res.render('login', { error: 'Invalid email or password' });
        }
      });
    } else {
      res.render('login', { error: 'Invalid email or password' });
    }
  })
};

export default handleSubmitLogin