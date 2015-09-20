/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap
var userManager = require('../managers/user');

module.exports = function(app) {
    app.use('/users', router);
};

router.get('/', function(req, res, next) {
    userManager.findAll().
        then(function(users) {
            res.render('users', {
                title: 'Users',
                users: users
            });
        }).
        fail(function(err) {
            next(err);
        });
});

router.get('/:username', function(req, res, next) {
    userManager.findByUsername(req.params.username).
        then(function(user) {
            if (!user) {
                res.status(404).
                    send('User Not Found');
            } else {
                res.render('user', {
                    title: 'User',
                    user: user
                });
            }
        }).
        fail(function(err) {
            next(err);
        });
});

