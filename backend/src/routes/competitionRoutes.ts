import express from 'express';

const router = express.Router();

// GET /api/competitions
router.get('/', (req, res) => {
  res.json({ message: 'Get all competitions' });
});

// GET /api/competitions/:id
router.get('/:id', (req, res) => {
  res.json({ message: `Get competition with id ${req.params.id}` });
});

// GET /api/competitions/search
router.get('/search', (req, res) => {
  res.json({ message: 'Search competitions' });
});

export default router;