const path = require('path');
const express = require('express');
const users = require('../controllers/main');
const router = express.Router();


// Get the index page
router.get('/', users.getIndexPage);

router.get('/sign-up', (req,res,next) => {
    res.render('./auth/sign-up.ejs', {
        pageTitle:'Register',
        path:'/sign-up'
    });
});

// Post register data
router.post('/register', users.postRegister);

router.get('/login-register', (req,res,next) => {
    res.render('./auth/login-register.ejs', {
        pageTitle:'Login',
        path:'/login-register'
    });
});

// Get home page
router.get('/home', users.getHomePage);

// Post login data
router.post('/login', users.postLogin);



// Get loggout page
router.get('/loggout', users.Loggout);


module.exports = router;