const express = require('express')
const router = express.Router()

// Scholarships page route
router.get('/', (req, res) => {
    res.render('scholarships', {
      title: "Scholarships",
      name: "Scholarships"
    })
  });
  
module.exports = router