const express = require('express')
const router = express.Router()

// Football Matches page route
router.get('/football-matches', (req, res) => {
    res.render('football-matches', {
      title: "Football Matches",
      name: "Football Matches"
    })
  });

module.exports = router