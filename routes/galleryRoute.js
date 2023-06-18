import { Router } from 'express';
const router = Router();

// Gallery Page route
router.get('/gallery', (req, res) => {
    res.render('gallery', {
      title: "Gallery",
      name: "Our Gallery"
    })
  })

export default router;