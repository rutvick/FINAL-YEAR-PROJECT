const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/page');
const adminRouter = require('./routes/admin');
const authRouter = require('./routes/auth');
const app = express();

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded({extended : false}));

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, 'public')));

// Template engine: ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//app.set('views','views');

// session
app.use(session({
    secret:'Login',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));


// Routers
app.use('/',authRouter);
app.use(pageRouter);
app.use(adminRouter);

// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

// Setting up the server
app.listen(5000, () => {
    console.log('Server is running on port 5000...');
});

module.exports = app;