import { Router } from 'express';
const router = Router();

// accomodation Page route
router.get('/accomodation', (req, res) => {
    res.render('accomodation', {
      title: "Accomodation",
      name: "Accomodation"
    })
})

export default router;