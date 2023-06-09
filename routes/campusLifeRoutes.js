const express = require('express')
router = express.Router()

// Campus Life Page route
router.get('/', (req, res) => {
    res.render('campus-life', {
      title: "Campus Life",
      name: "Campus Life"
    })
  })

module.exports = router