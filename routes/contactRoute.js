const express = require('express')
const router = express.Router()

// Contact Page route
router.get('/contact-us', (req, res) => {
    res.render('contact-us', {
      title: "Contact Us",
      name: "Contact Us"
    })
  })

  module.exports = router