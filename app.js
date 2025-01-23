const express = require('express');
const session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');

app.use(express.static('public'));//hace que public sea el comienzo de la ruta relativa haciendo posible rutas como /javascript/snake en snake.ejs
app.set('view engine','ejs');
app.set('views', './views');

app.locals.title = "CHAT&SNAKE"

const indexRouter = require('./routes/index');
const footerRouter = require('./routes/footer');
const chatRouter = require('./routes/chat');
const snakeRouter = require('./routes/snake');
const registerRouter = require('./routes/register');
//const loginRouter = require('./routes/login');

app.use(session({
    secret: 'mi-secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

app.use(cookieParser());

// Middleware para enviar la sesión a EJS
app.use((req, res, next) => {
    res.locals.session = req.session; // Hacer que la sesión esté disponible en las vistas
    res.locals.cookiesAccepted = req.cookiesAccepted || false;
    next();
});

app.use(express.urlencoded({ extended: true }));//hace que se pueda usar req.body
app.use(express.json());//hace que se pueda usar req.body

app.use('/', indexRouter,footerRouter);
app.use('/chat', chatRouter);
app.use('/snake', snakeRouter);
app.use('/register', registerRouter);
//app.use('/login', loginRouter);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));