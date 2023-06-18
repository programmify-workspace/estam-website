import { Router } from 'express';
const router = Router();

// Research page route
router.get('/research', (req, res) => {
    res.render('research', {
      title: "Research",
      name: "Research"
    })
  });
  
export default router;