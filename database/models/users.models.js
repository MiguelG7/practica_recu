const bcrypt = require('bcrypt');
const fs = require('node:fs');
const { console } = require('node:inspector');

users = {};

users.data = {};
users.email_user = {};


users.getUsernameByEmail = function(email){
    return users.email_user[email];
}

users.getEmailByUsername = function(username){
    return users.data[username].email;
}

users.generateHash = function(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) reject(err); // Rechaza la promesa si hay un error
            resolve(hash); // Resuelve la promesa con el hash
        });
    });
};

users.comparePass = async function(password, hash){
    return await bcrypt.compare(password, hash);
}

users.register = async function(username, email, password) {

    const databaseContent = await users.showDatabase();
    if (users.data.hasOwnProperty(username)) {
        throw new Error(`Ya existe el usuario ${username}.`);
    }
    if (users.email_user.hasOwnProperty(email) ){
        throw new Error(`Ya existe un usuario con el correo ${email}.`);
    }


    console.log("El correo es ",email, "y existen ", users.email_user);

    // Generar el hash de forma asíncrona
    const hash = await users.generateHash(password);

    // Guardar el usuario en la base de datos en memoria
    users.data[username] = { username, email, hash, last_Login: new Date().toISOString() };
    users.email_user[email] = username;

    // Obtener los datos de la base de datos como un array
    
    databaseContent.push(users.data[username]);


    console.log("database"+databaseContent);

    // Escribir los datos en un archivo JSON
    fs.writeFile('./database/db.json', JSON.stringify(databaseContent, null, 2), err => {
        if (err) {
            console.error("Error al escribir en la base de datos:", err);
        } else {
            console.log("Base de datos actualizada correctamente.");
        }
    });
};




users.isLoginRight = async function(email_user, type, password){
    if(type == 'email'){
        if(!users.email_user.hasOwnProperty(email_user)){
            return false;
        }
        return await users.comparePass(password, users.data[users.email_user[email_user]].hash);    
    }else{
        if(!users.data.hasOwnProperty(email_user)){
            return false;
        }
        return await users.comparePass(password, users.data[email_user].hash);
    }
    
}

users.showDatabase = async function() {
    const result = Object.keys(users.data).map(username => {
        const user = users.data[username];
        return {
            username: user.username,
            email: user.email,
            hash: user.hash
        };
    });

    return result; // Devuelve el array con los datos de los usuarios
};


module.exports = users;