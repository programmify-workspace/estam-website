import { Router } from 'express';
const router = Router();

// Admissions Page route
router.get('/student/dashboard', (req, res) => {
  res.render('student/dashboard', {
    title: "Student Dashboard",
    name: "Student Dashboard"
  })
})

export default router;