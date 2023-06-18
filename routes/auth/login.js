import { Router } from 'express';
const router = Router();

// Admissions Page route
router.get('/login', (req, res) => {
  res.render('login', {
    title: "Login",
    name: "Login"
  })
})

export default router;