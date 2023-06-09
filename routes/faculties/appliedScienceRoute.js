const express = require('express')
router = express.Router()

// Faculty of applied science
router.get('/faculty-of-applied-science', (req, res) => {
    res.render('faculty-of-applied-science', {
      title: "Faculty of Applied Science",
      name: "Faculty of Applied Science"
    })
  })

  module.exports = router