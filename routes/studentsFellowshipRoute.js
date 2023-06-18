import { Router } from 'express';
const router = Router();

// Students Fellowship page route
router.get('/students-fellowship', (req, res) => {
    res.render('students-fellowship', {
      title: "Students Fellowship",
      name: "Students Fellowship"
    })
  });

  
  export default router;