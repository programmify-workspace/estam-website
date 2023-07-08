const express = require('express')
const router = express.Router()

// Craft week page route
router.get('/craft-week', (req, res) => {
    res.render('craft-week', {
      title: "Craft Week",
      name: "Craft Week"
    })
  });

  module.exports = router