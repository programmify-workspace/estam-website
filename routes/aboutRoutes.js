const express = require('express')
const router = express.Router()

// About Page route
router.get('/about', (req, res) => {
    res.render('about', {
      title: "About",
      name: "About Us"
    })
  })

// Export the router
module.exports = router