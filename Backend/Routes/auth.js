const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ ok: true, route: 'auth' });
});

router.post('/login', (req, res) => {
  res.status(501).json({ message: 'Login not implemented' });
});

router.post('/register', (req, res) => {
  res.status(501).json({ message: 'Register not implemented' });
});

module.exports = router;
