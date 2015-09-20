/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var db = require('../lib/utils/db');
var logger = require('../lib/utils/logger');
var userManager = require('../lib/managers/user');
var users = [
    {
        username: 'elonmusk',
        firstName: 'Elon',
        lastName: 'Musk'
    },
    {
        username: 'sergeybrin',
        firstName: 'Sergey',
        lastName: 'Brin'
    },
    {
        username: 'markzuckerberg',
        firstName: 'Mark',
        lastName: 'Zuckerberg'
    }
];

// init mongo connection
db.connect();

_.forEach(users, function(user) {
    userManager.create(user).
        then(function(newUser) {
            logger.info(newUser.getFullName());
        });
});
