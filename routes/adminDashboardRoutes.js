const express = require('express')
const router = express.Router()
const passport = require("../utils/passportUtils");
const bcrypt = require('bcrypt');
const pool = require('../database');

const {isAuthenticated, preventLoginAccess} = require("../authenticate-admin");

router.get("/admin-dashboard", isAuthenticated, async (req, res) => {
    try {
      const sql = "SELECT *, DATE_FORMAT(created_at, '%b %d, %Y') AS formatted_date FROM applicants";
      const [results, fields] = await pool.query(sql);
      console.log(results);
      
      res.render('admin-dashboard', { layout: false, applicants: results, title: "Applicants" });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately, e.g., send an error response
      res.status(500).send("An error occurred while fetching data.");
    }
});

router.get("/admin-dashboard/applicants/:id", isAuthenticated, async (req, res) => {
    try {
      const id = req.params.id
      const sql = "SELECT *, DATE_FORMAT(created_at, '%b %d, %Y') AS formatted_created_at, DATE_FORMAT(dob, '%b %d, %Y') AS formatted_dob FROM applicants WHERE id = ?";
      const [result, fields] = await pool.query(sql, [id]);
      console.log(result);
      
      res.render('admin-dashboard-applicant', { layout: false, applicants: result });
    } catch (error) {
      console.log(error);
      // Handle the error appropriately, e.g., send an error response
      res.status(500).send("An error occurred while fetching data.");
    }
});


router.get("/admin-dashboard/students", isAuthenticated, async (req,res) => {
  try {
    const sql = "SELECT * FROM students";
    const [results, fields] = await pool.query(sql);
    console.log(results);
    res.render("admin-dashboard-students", { layout: false, students: results, title: "Students"  })
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while fetching data.");
  }
})

router.get("/admin-dashboard/students/:id", isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT *, DATE_FORMAT(dob, '%b %d, %Y') AS formatted_dob FROM students WHERE id = ?";
    const [result, fields] = await pool.query(sql, [id]);
    console.log(result);
    
    res.render('admin-dashboard-student', { layout: false, student: result });
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while fetching data.");
  }
});



router.get("/admin-dashboard/rejected-applications", isAuthenticated, async (req,res) => {
  try {
    const sql = "SELECT *, DATE_FORMAT(created_at, '%b %d, %Y') AS formatted_date FROM rejects";
    const [results, fields] = await pool.query(sql);
    console.log(results);
    res.render('admin-rejected-applicants', { layout: false, applicants: results, title: "Rejected Applicants"  });
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while fetching data.");
  }
})

router.get("/admin-dashboard/rejected-applications/:id", isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id
    const sql = "SELECT *, DATE_FORMAT(created_at, '%b %d, %Y') AS formatted_created_at, DATE_FORMAT(dob, '%b %d, %Y') AS formatted_dob FROM rejects WHERE id = ?";
    const [result, fields] = await pool.query(sql, [id]);
    console.log(result);
    
    res.render('admin-dashboard-rejected-applicant', { layout: false, applicants: result });
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while fetching data.");
  }
});



router.get('/admin-dashboard/admin-settings', isAuthenticated, async (req, res) => {
  try {
    const id = req.user.id;
    const sql = "SELECT * FROM admins WHERE id = ?";
    const [result, field] = await pool.query(sql, [id]);
    console.log(result);

    // const isMatch = await bcrypt.compare(password, user.password);
        // const hash = await bcrypt.
        // console.log(hash)
    // console.log(currentPasswordError);
    // result = {..., password: }
    // res.json(result);
    res.render('admin-dashboard-admin-setting', {
      layout: false,
      admin: result,
      title: "Admin",
      currentPasswordError: req.flash('currentPasswordError')[0], // Pass error flash message
      newPasswordError: req.flash('newPasswordError')[0], // Pass error flash message
      success: req.flash('success')[0] // Pass success flash message
  });
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., send an error response
    res.status(500).send("An error occurred while fetching data.");
  }
  
})





module.exports = router;