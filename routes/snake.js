const express = require('express');
const router = express.Router();

router.get('/', (req,res) =>{
    res.render('./snake/snake', {user: req.session.user.username});
});

module.exports = router;