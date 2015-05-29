// Dependencies
var concat         = require('gulp-concat'),
    connect        = require('gulp-connect'),
    del            = require('del'),
    gulp           = require('gulp'),
    jscs           = require('gulp-jscs'),
    jshint         = require('gulp-jshint'),
    mainBowerFiles = require('main-bower-files'),
    runSequence    = require('run-sequence'),
    sass           = require('gulp-sass'),
    stylish        = require('jshint-stylish'),
    templateCache  = require('gulp-angular-templatecache');


// Paths
var paths = {
    build  : 'build',
    html   : ['public/app/**/*.html'],
    index  : ['public/index.html'],
    scripts: ['public/app/**/*.js', '!public/**/*.spec.js'],
    styles : ['public/sass/**/*.scss']
};

/**
 * Concat scripts and move to build dir.
 */
gulp.task('scripts', function() {
    return gulp
        .src(paths.scripts)
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest(paths.build + '/js'))
        .pipe(connect.reload());
});

/**
 * Concat vendor scripts and move to build dir.
 */
gulp.task('vendor-scripts', function() {
    return gulp
        .src(mainBowerFiles(), { base: 'bower_components' })
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(paths.build + '/js'))
        .pipe(connect.reload());
});

/**
 * Compile + concat css and move to build dir.
 */
gulp.task('styles', function() {
    return gulp
        .src(paths.styles)
        .pipe(sass())
        .pipe(gulp.dest(paths.build + '/css'))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    return connect.server({
        root: paths.build,
        livereload: true,
        port: 8888
    });
});

/**
 * Move index file to the build dir.
 */
gulp.task('index', function() {
    return gulp
        .src(paths.index)
        .pipe(gulp.dest(paths.build));
});


gulp.task('html', function() {
    return gulp
        .src(paths.html)
        .pipe(templateCache('templates.js', {
            standalone: true,
            module: 'helium.templates'
        }))
        .pipe(gulp.dest(paths.build + '/js'))
        .pipe(connect.reload());
});

gulp.task('lint', function() {
    return gulp
        .src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jscs());
});

gulp.task('clean', function(done) {
    return del([paths.build], done);
});

/**
 * Build entire app.
 */
gulp.task('build', function(done) {
    runSequence(
        'clean',
        ['vendor-scripts', 'scripts', 'styles', 'index', 'html'],
        done
    );
});

/**
 * File watcher.
 */
gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['lint', 'scripts']);
    gulp.watch(paths.html, ['html']);
    gulp.watch(paths.styles, ['styles']);
});

/**
 * Default task.
 */
gulp.task('default', ['lint', 'watch', 'build', 'connect']);
