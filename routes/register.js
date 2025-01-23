const express = require('express');

const router = express.Router();

const users = require('../database/models/users.models');


router.get('/', (req,res) =>{
    res.render('./register/register');
});

router.post('/', (req,res)=>{
    const username = req.body.user;
    const email = req.body.email;
    const password = req.body.password1;

    console.log(username,email,password);

    try {
        users.register(username, email, password);
        console.log(username," (", email,") ", "se ha registrado con éxito");
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error.message);
    }
})

module.exports = router;