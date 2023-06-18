import { Router } from 'express';
const router = Router();

// About Page route
router.get('/about', (req, res) => {
    res.render('about', {
      title: "About",
      name: "About Us"
    })
  })

// Export the router
export default router;