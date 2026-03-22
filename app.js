const express = require('express');
const cors = require('cors'); 
const session = require('express-session');
const jwt = require('jsonwebtoken');
const workoutRouter = require('./routes/workouts');

let users = [];

/**
 * @description Check if a user already exists
 * @param {String} username to look for
 * @returns {Boolean}
 */
const doesExist = username => {
    const foundUser = users.filter(user => user.name === username);
    return (foundUser.length > 0);
}

/**
 * @description Check if a given user has already been authenticated
 * @param {String} username to look for
 * @param {String} password assigned to username
 * @returns {Boolean}
 */
const authenticatedUser = (username, password) => {
    const validUser = users.filter(user => {
        return user.name === username && user.password === password;
    });
    return (validUser.length > 0);
}

// Configure Express App
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(session({secret:"fingerprint", resave:true, saveUninitialized:true})); 

app.use('/workouts', (req, res, next) => {
    // Check if user is logged in and has valid access token
    if (req.session.authorization) {
        let token = req.session.authorization["accessToken"];

        // Verify JWT token
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user;
                next();
            } else {
                return res.status(403).json({message: "User not authenticated"});
            }
        });
    } else {
        return res.status(401).json({message: "User not logged in"});
    }
});

app.post('/login', (req, res) => {
    const {username, password} = req.body;
    // Check validity of input
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }

    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access
        let accessToken = jwt.sign(
            { data: password },
            'access',
            { expiresIn: 60 * 60 }
        );

        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        } 
        return res.status(200).json({ message: "User successfully logged in" });
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }
});

app.post('/register', (req, res) => {
    const {username, password} = req.body;
    // Check validity of input
    if (username && password) {
        // Check if user already exists
        if (!doesExist(username)) {
            // Add user to users array
            users.push({name: username, password: password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    } else {
        // Invalid input
        return res.status(404).json({message: "Error registering user"});
    }
});

// link workoutRouter
app.use('/workouts', workoutRouter);

module.exports = app;