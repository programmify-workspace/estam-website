const express = require('express')
const router = express.Router()

// Faq Page route
router.get('/', (req, res) => {
    res.render('faq', {
      title: "FAQ",
      name: "FAQ"
    })
  })

  
module.exports = router