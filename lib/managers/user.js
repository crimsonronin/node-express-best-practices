/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var dbUtils = require('../utils/db');
var User = require('../models/user');

/**
 * A User manager.
 *
 * @constructor
 */
function UserManager() {

}

/**
 * Finds all users.
 *
 * @param options
 * @returns {Promise}
 * @public
 */
UserManager.prototype.findAll = function(options) {
    return dbUtils.findAll(User, options);
};

/**
 * Find a user by the passed options.
 *
 * @param options
 * @returns {Promise}
 * @public
 */
UserManager.prototype.find = function(options) {
    return dbUtils.find(User, options);
};

/**
 * Finds a user by an id.
 *
 * @param id
 * @param options
 * @returns {Promise}
 * @public
 */
UserManager.prototype.findById = function(id, options) {
    if (!options) {
        options = {}; // eslint-disable-line no-param-reassign
    }

    options.criteria = {
        _id: id
    };

    return this.find(options);
};

/**
 * Find a user by a username.
 *
 * @param username
 * @returns {Promise}
 * @public
 */
UserManager.prototype.findByUsername = function(username) {
    return this.find({
        criteria: {
            username: username
        }
    });
};

/**
 * Creates a user by passing in a user model.
 *
 * @param user
 * @returns {Promise}
 * @public
 */
UserManager.prototype.create = function(user) {
    if (!(user instanceof User)) {
        user = new User(user); // eslint-disable-line no-param-reassign
    }
    return dbUtils.create(user);
};

/**
 *
 * @param user
 * @returns {Promise}
 */
UserManager.prototype.update = function(user) {
    if (!(user instanceof User)) {
        throw new Error('The user must be an instance of a User model in order to update it.', user);
    }

    if (!user._id) {
        throw new Error('The user must have an existing id to be able to update it', user);
    }

    return dbUtils.update(user);
};

module.exports = new UserManager();
