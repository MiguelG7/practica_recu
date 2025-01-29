const express = require('express');
const router = express.Router();


router.get('/', (req,res) =>{
    console.log("entre a router.get('/game");
    res.render('game');
});

module.exports = router;