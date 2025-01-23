const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    console.log('Entrando a /chat');
    res.render('./chat/chat.ejs');
});

module.exports = router;