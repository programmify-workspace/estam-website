import { Router } from 'express';
const router = Router();

// Admissions Page route
router.get('/admin/dashboard', (req, res) => {
  res.render('admin/dashboard', {
    title: "Admin Dashboard",
    name: "Admin Dashboard"
  })
})

export default router;