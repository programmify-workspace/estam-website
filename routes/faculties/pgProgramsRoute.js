import { Router } from 'express';
const router = Router();

// postgraduate-programs
router.get('/postgraduate-programs', (req, res) => {
    res.render('postgraduate-programs', {
      title: "Postgraduate Programs",
      name: "Postgraduate Programs"
    })
  })

  export default router;