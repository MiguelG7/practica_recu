const express = require('express');
const router = express.Router();
const users = require('../database/models/users.models');
const session = require('express-session');

router.get('/cookies_accepted', (req,res) => {
    res.cookie('cookiesAccepted', true, { 
        maxAge: 365 * 24 * 60 * 60 * 1000, // 1 año
        httpOnly: true,
        secure: false // Usa true si estás en HTTPS
      });

    res.redirect('/');
    
});

module.exports = router;