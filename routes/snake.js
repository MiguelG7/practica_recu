const express = require('express');
const router = express.Router();
const fs = require('node:fs');

router.get('/', (req,res) =>{

    console.log("GET /snake")

    //let obj = fs.readFileSync('./database/highscores.json');
    //let json = JSON.parse(obj);
    //console.log(String(obj));
    res.render('./snake/snake', {user: req.session.user.username, record: req.body.record});
});

router.post('/save-score', (req,res) =>{

    console.log("Servidor: récord recibido de ",  req.session.user.username, "recibido", req.body.record)

    highscores = {
        username: req.session.user.username,
        record:  req.body.record
    };

        // Escribir los datos en un archivo JSON
    fs.appendFile('./database/highscores.json', (JSON.stringify(highscores, null, 2),"\n"), err => {
        if (err) {
            console.error("Error al escribir en la base de datos:", err);
        } else {
            console.log("Base de datos actualizada correctamente.");
        }
    });

});

module.exports = router;