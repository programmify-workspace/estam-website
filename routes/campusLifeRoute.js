import { Router } from 'express';
const router = Router();

// Campus Life Page route
router.get('/campus-life', (req, res) => {
    res.render('campus-life', {
      title: "Campus Life",
      name: "Campus Life"
    })
  })

export default router;