const express = require('express')
const router = express.Router()
const passport = require("../utils/passportUtils");
const bcrypt = require('bcrypt');
const pool = require('../database');

const {isStudentAuthenticated, preventStudentLoginAccess} = require("../authenticate-student");

router.get("/student-dashboard", isStudentAuthenticated, async (req, res) => {
    try {
        const id = req.user.id;

      const sql = "SELECT *, DATE_FORMAT(dob, '%b %d, %Y') AS formatted_dob FROM students WHERE id = ?";
      const [results, fields] = await pool.query(sql, id);
      console.log(results);
      
      res.render('student-dashboard', { layout: false, student: results });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately, e.g., send an error response
      res.status(500).send("An error occurred while fetching data.");
    }
});


module.exports = router;