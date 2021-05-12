const path = require('path');
const User = require('../models/user');

// create an object from the class User in the file core/user.js
const user = new User();

exports.getIndexPage = (req, res, next) => {
    let user = req.session.user;
    // If there is a session named user that means the user is logged in. so we redirect him to home page by using /home route below
    //user = true;
    if(user) {
        res.redirect('/home');
        return;
    }
    // IF not we just send the index page.
    res.render('auth/login-register', {pageTitle:"My application"});
    //res.render('index');
};


exports.getHomePage = (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('pages/home', {opp:req.session.opp, name:user.username,pageTitle:'My Application'});
        return;
    }
    res.redirect('/');
};


exports.postLogin = (req, res, next) => {
    // The data sent from the user are stored in the req.body object.
    // call our login function and it will return the result(the user data).
    console.log(req.body);
    console.log(req.body.username);
    user.login(req.body.username, req.body.password, function(result) {
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })

};


exports.postRegister = (req, res, next) => {
    // prepare an object containing all user inputs.
    let userInput = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };
    //console.log(userInput)
    // call create function. to create a new user. if there is no error this function will return it's id.
    user.create(userInput, function(lastId) {
        // if the creation of the user goes well we should get an integer (id of the inserted user)
        if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/login-register');
            });

        }else {
            console.log('Error creating a new user ...');
        }
    });

};



exports.Loggout = (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
};