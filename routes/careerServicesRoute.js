import { Router } from 'express';
const router = Router();

// Career Services page route
router.get('/career-services', (req, res) => {
    res.render('career-services', {
      title: "Career Services",
      name: "Career Services"
    })
  });
  
export default router;