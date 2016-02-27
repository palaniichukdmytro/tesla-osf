"use strict";

var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');
 

 //clean 
 gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

//connect and livereload
 gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});



 //build, before build the dist folder, the clean task executes
gulp.task('build',['clean'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());

});


//bower write the path to our bower-components file using directory
gulp.task('bower', function () {
  gulp.src('./app/index.html')
    .pipe(wiredep({
      directory : "app/bower_components"
    }))
    .pipe(gulp.dest('./app'));
});


//gulp watch task for bower.json and then execute wiredev
gulp.task('watch', function () {
         gulp.watch('bower.json', ['bower']);
         gulp.watch('app/*.html', ['build']);
         gulp.watch('app/css/*.css', ['build']);
         gulp.watch('app/js/*.js', ['build']);
         
	})

gulp.task('default', ['connect', 'build', 'watch']);