import { Router } from 'express';
const router = Router();

// Faculty of engineering
router.get('/faculty-of-engineering', (req, res) => {
    res.render('faculty-of-engineering', {
      title: "Faculty of Engineering",
      name: "Faculty of Engineering"
    })
  })

  export default router;