const express = require('express');
const router = express.Router();
const config = require('../config/constants');

/**
 * POST /api/auth/login
 * Authenticate admin user
 */
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (username === config.ADMIN_CREDENTIALS.username && 
        password === config.ADMIN_CREDENTIALS.password) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
