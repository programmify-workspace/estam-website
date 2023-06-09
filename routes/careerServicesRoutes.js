const express = require('express')
const router = express.Router()

// Career Services page route
router.get('/', (req, res) => {
    res.render('career-services', {
      title: "Career Services",
      name: "Career Services"
    })
  });
  
module.exports = router