const express = require('express')
const router = express.Router()

// Christmas Carols page route
router.get('/', (req, res) => {
    res.render('christmas-carols', {
      title: "Christmas Carols",
      name: "Christmas Carols"
    })
  });

module.exports = router