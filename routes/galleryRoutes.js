const express = require('express')
router = express.Router()

// Gallery Page route
router.get('/', (req, res) => {
    res.render('gallery', {
      title: "Gallery",
      name: "Our Gallery"
    })
  })

module.exports = router