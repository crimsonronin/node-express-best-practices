/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var request = require('supertest');
var app = require('../../../lib/app');
var db = require('../../../lib/utils/db');
var User = require('../../../lib/models/user');
var users = require('../../fixtures/users.json');

/**
 * An example of how to do e2e or intergration testing using supertest.
 *
 * This access the application via the routes, which is a very robust way of testing, but it is slower to execute.
 */

describe('Controllers - Users', function() {
    before(function(done) {
        db.connect();

        // insert users
        db.import(User, users).
            then(function() {
                done();
            });
    });

    after(function(done) {
        db.removeAll(User).
            then(function() {
                done();
            });
    });

    it('GET /users: should display all users', function(done) {
        request(app.getExpressApplication())
            .get('/users')
            .expect(200, done);
    });

    it('GET /users/elonmusk: should display a single user', function(done) {
        request(app.getExpressApplication())
            .get('/users/elonmusk')
            .expect(200, done);
    });

    it('GET /users/nouser: should return 404', function(done) {
        request(app.getExpressApplication())
            .get('/users/nouser')
            .expect(404, done);
    });
});
