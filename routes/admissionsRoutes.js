const express = require('express')
const router = express.Router()

// Admissions Page route
router.get('/admissions', (req, res) => {
  res.render('admissions', {
    title: "Admissions",
    name: "Admissions"
  })
})

module.exports = router