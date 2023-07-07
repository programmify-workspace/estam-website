const express = require('express')
const router = express.Router()

// Excursion page route
router.get('/excursion', (req, res) => {
    res.render('excursion', {
      title: "Excursion",
      name: "Excursion"
    })
  });

  module.exports = router