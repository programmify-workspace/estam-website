import { Router } from 'express';
const router = Router();

// Craft week page route
router.get('/craft-week', (req, res) => {
    res.render('craft-week', {
      title: "Craft Week",
      name: "Craft Week"
    })
  });

  export default router;