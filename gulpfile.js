'use strict';

var gulp		      = require('gulp');
var babel 				= require('gulp-babel');
var sass 					= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');
var inject 				= require('gulp-inject');
var debug 				= require('gulp-debug');
var runSequence   = require('run-sequence');
var path				  = require('path');
var del 					= require('del'); 

var config = {
	dev_path: "impl/src/main/resources/web/",
  dist_path: "impl/src/main/javascript/web/"
}

// Default task
gulp.task('default', function(done) {
  runSequence('clean', 'scripts', 'styles', 'inject', done);
});

gulp.task('clean', function() {
	return del.sync([config.dist_path]);
});

gulp.task('scripts', function() {
	return gulp.src(config.dev_path + '/**/*.{js,jsx}')
		.pipe(babel({
			plugins: ['transform-es2015-modules-amd'],
			presets: ['es2015', 'react']
		}))
		.pipe(gulp.dest(config.dist_path))
});

gulp.task('styles', function() {
	return gulp.src(config.dev_path + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(config.dist_path))
});

gulp.task('inject', function () {
	var toInject = gulp.src(config.dist_path + '/**/*.css', {read: false});
	return gulp.src(config.dev_path + '/index.html')
		.pipe(inject(toInject, {ignorePath: config.dist_path, addRootSlash: false}))
    .pipe(gulp.dest(config.dist_path))
});

gulp.task('watch', function() {
  gulp.watch(config.dev_path + '/**/*.scss', ['styles']);
  gulp.watch(config.dev_path + '/**/*.{js,jsx}', ['scripts']);
});