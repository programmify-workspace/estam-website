const express = require('express')
router = express.Router()

// Campus Life Page route
router.get('/campus-life', (req, res) => {
    res.render('campus-life', {
      title: "Campus Life",
      name: "Campus Life"
    })
  })

module.exports = router