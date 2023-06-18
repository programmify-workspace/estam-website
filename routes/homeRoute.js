import { Router } from 'express';
const router = Router();

// Home Page route
router.get('/', (req, res) => {
    res.render('home', {
      title: "Home",
      name: "Home"
    })
  })

// Export the router
export default router;