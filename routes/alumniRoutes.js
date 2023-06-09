const express = require('express')
const router = express.Router()

// Alumni Page route
router.get('/alumni', (req, res) => {
    res.render('alumni', {
      title: "Alumni",
      name: "Alumni"
    })
  });

  module.exports = router