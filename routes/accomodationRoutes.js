const express = require('express')
const router = express.Router()

// accomodation Page route
router.get('/', (req, res) => {
    res.render('accomodation', {
      title: "Accomodation",
      name: "Accomodation"
    })
})

module.exports = router