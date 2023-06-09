const express = require('express')
router = express.Router()

// Apply Page route
router.get('/', (req, res) => {
    res.render('apply', {
      title: "Apply",
      name: "Apply"
    })
  })

module.exports = router