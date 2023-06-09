const express = require('express')
router = express.Router()

// Faculty of social and management science
router.get('/faculty-of-social-and-management-science', (req, res) => {
    res.render('faculty-of-social-and-management-science', {
      title: "Faculty of Social and Management Science",
      name: "Faculty of Social and Management Science"
    })
  })

  module.exports = router