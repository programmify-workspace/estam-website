const express = require('express')
const router = express.Router()

// Home Page route
router.get('/', (req, res) => {
    res.render('home', {
      title: "Home",
      name: "Home"
    })
  })

// Export the router
module.exports = router