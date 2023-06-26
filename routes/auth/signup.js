import { Router } from 'express';
const router = Router();

// Admissions Page route
router.get('/signup', (req, res) => {
  res.render('signup', {
    title: "Sign Up",
    name: "Sign UP"
  })
})

export default router;