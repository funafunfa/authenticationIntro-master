var mongoose = require('mongoose');
var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var UserNew = require("../models/userNew");


router.post('/register', function(req, res) {
    console.log(req.body.username);
    if (!req.body.username || !req.body.password) {
        console.log("error");
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new UserNew({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            name: req.body.name,
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                console.log("error");
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});
router.get('/register', function(req, res) {
    console.log(req.query.username);
    if (!req.query.username || !req.query.password) {
        console.log("error");
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var newUser = new UserNew({
            username: req.query.username,
            password: req.query.password,
            role: req.query.role,
            name: req.query.name,
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                console.log("error");
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});


router.post('/login', function(req, res) {
    console.log(req.body);

    UserNew.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), settings.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token, id:user._id, name:user.name, role:user.role});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

router.get('/login', function(req, res) {
    console.log(req.body);

    UserNew.findOne({
        username: req.query.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.query.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), settings.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token, id:user._id, name:user.name, role:user.role});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});





module.exports = router;