import { Router } from 'express';
const router = Router();

// Students week page route
router.get('/students-week', (req, res) => {
    res.render('students-week', {
      title: "Students' Week",
      name: "Students' Week"
    })
  });
  
  export default router;