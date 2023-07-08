const express = require('express')
const router = express.Router()

// Research page route
router.get('/research', (req, res) => {
    res.render('research', {
      title: "Research",
      name: "Research"
    })
  });
  
module.exports = router