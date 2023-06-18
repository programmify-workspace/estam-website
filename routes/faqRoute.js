import { Router } from 'express';
const router = Router();

// Faq Page route
router.get('/faq', (req, res) => {
    res.render('faq', {
      title: "FAQ",
      name: "FAQ"
    })
  })

  
export default router;