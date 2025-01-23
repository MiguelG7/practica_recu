const express = require('express');
const router = express.Router();
const users = require('../database/models/users.models')

router.get('/', (req,res) =>{
    console.log("entre a router.get('/");
    if (req.cookies.loggedIn){
        req.session.user = {username: req.cookies.user}
    }
    res.render('index', {cookies: req.cookies});
});

router.post('/login', async (req,res) => {
    const user = req.body.user;
    const password = req.body.password;
    console.log(user,password);
    const esValido = await users.isLoginRight(user,null,password);

    if (esValido){
        console.log("El inicio de sesión fue válido")
        req.session.user = {user: user};
        res.cookie('loggedIn', true, { 
            maxAge: 3 * 60 *60 * 1000, // 3 días
            httpOnly: true // Solo accesible desde el servidor
        });
        res.cookie('user', user, { 
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        });
        console.log("redirigiendo a /")
        res.redirect("/");
    }
    else{
        res.redirect("/");
    }
});

router.get('/logout', (req,res) => {
    for (const cookieName in req.cookies) {
        res.clearCookie(cookieName); // Borra cada cookie encontrada
    }
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;