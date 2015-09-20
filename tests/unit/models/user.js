/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var should = require('should');
var db = require('../../../lib/utils/db');
var User = require('../../../lib/models/user');
var userManager = require('../../../lib/managers/user');
var users = require('../../fixtures/users.json');

/**
 * This is an example of a simple unit test for the User model.
 *
 * We are primarily concerned with any functionality which we introduced eg.
 *
 * getFullName
 * createdOn date stamping
 */
describe('Models - User', function() {
    before(function(done) {
        db.connect();
        done();
    });

    after(function(done) {
        db.removeAll(User).
            then(function() {
                done();
            });
    });

    it('should contain all valid user fields', function(done) {
        var user = new User(users[0]);

        user.firstName.should.equal('Elon');
        user.lastName.should.equal('Musk');
        user.getFullName().should.equal('Elon Musk');
        user.username.should.equal('elonmusk');
        user.createdOn.should.eql(new Date('2015-09-20T02:13:50.000Z'));
        done();
    });

    it('should create a user and stamp a createdOn date', function(done) {
        var newUser = users[0];
        delete newUser._id;
        delete newUser.createdOn;
        var createdOn;

        userManager.create(newUser).
            then(function(createdUser) {
                createdUser.firstName.should.equal('Elon');
                createdUser.lastName.should.equal('Musk');
                createdUser.getFullName().should.equal('Elon Musk');
                createdUser.username.should.equal('elonmusk');

                // ensure the created on was stamped
                createdUser.createdOn.should.not.be.empty;
                createdOn = createdUser.createdOn;

                // we change the name and resave
                createdUser.firstName = 'Elon Reeve';

                return userManager.update(createdUser);
            }).
            then(function(updatedUser) {
                // ensure that the name was updated
                updatedUser.firstName.should.equal('Elon Reeve');
                updatedUser.getFullName().should.equal('Elon Reeve Musk');

                // ensure the the created on date did not change!
                updatedUser.createdOn.should.eql(createdOn);
                done();
            });
    });
});
