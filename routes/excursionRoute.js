import { Router } from 'express';
const router = Router();

// Excursion page route
router.get('/excursion', (req, res) => {
    res.render('excursion', {
      title: "Excursion",
      name: "Excursion"
    })
  });

  export default router;