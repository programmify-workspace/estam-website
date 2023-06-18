import { Router } from 'express';
const router = Router();

// Christmas Carols page route
router.get('/christmas-carols', (req, res) => {
    res.render('christmas-carols', {
      title: "Christmas Carols",
      name: "Christmas Carols"
    })
  });

export default router;