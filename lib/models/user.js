/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var moment = require('moment');
var Schema = mongoose.Schema;

function User() {
    var UserSchema = new Schema({
        username: String,
        firstName: String,
        lastName: String,
        createdOn: Date
    });

    // prior to save do this
    UserSchema.pre('save', function(next) {
        if (!_.isDate(this.createdOn)) {
            this.createdOn = moment();
        }
        next();
    });

    UserSchema.methods.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
    };

    return mongoose.model('User', UserSchema);
}

module.exports = new User();
