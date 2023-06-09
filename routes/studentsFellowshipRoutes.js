const express = require('express')
const router = express.Router()

// Students Fellowship page route
router.get('/', (req, res) => {
    res.render('students-fellowship', {
      title: "Students Fellowship",
      name: "Students Fellowship"
    })
  });

  
module.exports = router