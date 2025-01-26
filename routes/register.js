const express = require('express');

const router = express.Router();

const users = require('../database/models/users.models');


router.get('/', (req,res) =>{
    res.render('./register/register');
});

router.post('/', async (req,res)=>{
    const username = req.body.user;
    const email = req.body.email;
    const password = req.body.password1;

    try {
        await users.register(username, email, password);
        await console.log(users.showDatabase());
        console.log(username," (", email,") ", "se ha registrado con éxito");
        res.redirect('/');
        
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;