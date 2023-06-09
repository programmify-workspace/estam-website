const express = require('express')
router = express.Router()

// postgraduate-programs
router.get('/postgraduate-programs', (req, res) => {
    res.render('postgraduate-programs', {
      title: "Postgraduate Programs",
      name: "Postgraduate Programs"
    })
  })

  module.exports = router