var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('./public/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch('./public/css/*.scss', ['sass']);
});

gulp.task('develop', function() {
    livereload.listen();
    nodemon({
        script: 'server.js',
        ext: 'js coffee handlebars',
        stdout: false
    }).on('readable', function() {
        this.stdout.on('data', function(chunk) {
            if (/^Express server listening on port/.test(chunk)) {
                livereload.changed(__dirname);
            }
        });
        this.stdout.pipe(process.stdout);
        this.stderr.pipe(process.stderr);
    });
});

gulp.task('default', [
    'sass',
    'develop',
    'watch'
]);
