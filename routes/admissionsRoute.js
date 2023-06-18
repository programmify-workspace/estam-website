import { Router } from 'express';
const router = Router();

// Admissions Page route
router.get('/admissions', (req, res) => {
  res.render('admissions', {
    title: "Admissions",
    name: "Admissions"
  })
})

export default router;