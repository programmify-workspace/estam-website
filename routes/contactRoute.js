import { Router } from 'express';
const router = Router();

// Contact Page route
router.get('/contact-us', (req, res) => {
    res.render('contact-us', {
      title: "Contact Us",
      name: "Contact Us"
    })
  })

  export default router;