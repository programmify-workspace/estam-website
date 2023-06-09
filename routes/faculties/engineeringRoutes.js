const express = require('express')
router = express.Router()

// Faculty of engineering
router.get('/', (req, res) => {
    res.render('faculty-of-engineering', {
      title: "Faculty of Engineering",
      name: "Faculty of Engineering"
    })
  })

  module.exports = router