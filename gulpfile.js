//dependencies
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var browserSync = require('browser-sync').create();
var proxy = require('proxy-middleware');
var url = require('url');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

//dependencies which does not need to be rebundled
var dependencies = ['react', 'react-dom'];

//count how many times it bundles
var bundleCount = 0;

//tasks
gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function () {
    bundleApp(true);
});

gulp.task('styles', function () {
    // Compiles CSS
    gulp.src('./src/css/**/*.css')
        .pipe(concat('bundle.css'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('watch', function () {
    gulp.watch(['./src/js/**/*.js'], ['scripts']);
    gulp.watch(['./src/css/**/*.css'], ['styles']);
});

gulp.task('browsersync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
});

gulp.task('default', ['styles', 'scripts', 'browsersync', 'watch']);

//functions
function bundleApp(isProduction) {
    bundleCount++;

    //bundle to one file
    var appBundler = browserify({
        entries: './src/js/main.js',
        debug: true
    });

    //if its not production make a separate file and only bundle once
    if (!isProduction && bundleCount === 1) {
        browserify({
            require: dependencies,
            debug: true
        })
            .bundle()
            .on('error', gutil.log)
            .pipe(source('dependencies.js'))
            .pipe(gulp.dest('./dist/'))

    }

    if (!isProduction) {
        dependencies.forEach(function (dependency) {
            appBundler.external(dependency);
        })
    }

    appBundler.transform("babelify", {presets: ["es2015", "react"]})
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(browserSync.reload({stream: true}))
        .pipe(gulp.dest('./dist/'))
        .pipe(notify('Completed!'))

}

