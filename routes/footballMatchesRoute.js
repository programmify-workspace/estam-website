import { Router } from 'express';
const router = Router();

// Football Matches page route
router.get('/football-matches', (req, res) => {
    res.render('football-matches', {
      title: "Football Matches",
      name: "Football Matches"
    })
  });

export default router;