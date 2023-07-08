const express = require('express')
const router = express.Router()

// Students week page route
router.get('/students-week', (req, res) => {
    res.render('students-week', {
      title: "Students' Week",
      name: "Students' Week"
    })
  });

module.exports = router