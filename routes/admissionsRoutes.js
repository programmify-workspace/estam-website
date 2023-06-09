const express = require('express')
const router = express.Router()

// Admissions Page route
router.get('/', (req, res) => {
  res.render('admissions', {
    title: "Admissions",
    name: "Admissions"
  })
})

module.exports = router