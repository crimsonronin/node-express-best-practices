/**
 * @author Josh Stuart <joshstuartx@gmail.com>
 */
var _ = require('lodash');
var express = require('express');
var glob = require('glob');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var exphbs = require('express-handlebars');

module.exports = function(app, config) {
    var env = process.env.NODE_ENV || 'development';
    var controllers = glob.sync(config.root + '/lib/controllers/*.js');

    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env === 'development';

    app.engine('handlebars', exphbs({
        layoutsDir: config.root + '/lib/views/layouts/',
        defaultLayout: 'main',
        partialsDir: [config.root + '/lib/views/partials/']
    }));
    app.set('views', config.root + '/lib/views');
    app.set('view engine', 'handlebars');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(compress());
    // serve public files
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());

    /**
     * Automatically add all controllers from the directory
     */
    _.forEach(controllers, function(controller) {
        require(controller)(app);
    });

    /**
     * Catch 404 errors
     */
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /**
     * In development environments display 500 errors.
     */
    if (app.get('env') === 'development') {
        app.use(function(err, req, res) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    /**
     * In production environments do not display the 500 errors.
     */
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });
};
