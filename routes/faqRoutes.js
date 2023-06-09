const express = require('express')
const router = express.Router()

// Faq Page route
router.get('/faq', (req, res) => {
    res.render('faq', {
      title: "FAQ",
      name: "FAQ"
    })
  })

  
module.exports = router