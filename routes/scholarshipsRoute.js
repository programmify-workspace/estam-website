import { Router } from 'express';
const router = Router();

// Scholarships page route
router.get('/scholarships', (req, res) => {
    res.render('scholarships', {
      title: "Scholarships",
      name: "Scholarships"
    })
  });
  
export default router;