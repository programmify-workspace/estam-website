import { Router } from 'express';
const router = Router();

// Alumni Page route
router.get('/alumni', (req, res) => {
    res.render('alumni', {
      title: "Alumni",
      name: "Alumni"
    })
  });

  export default router;