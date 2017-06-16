'use strict';

var gulp		      	= require('gulp');
var babel 					= require('gulp-babel');
var sass 						= require('gulp-sass');
var autoprefixer 		= require('gulp-autoprefixer');
var inject 					= require('gulp-inject');
var debug 					= require('gulp-debug');
var ignore 					= require('gulp-ignore');
var foreach 				= require('gulp-foreach');
var add 						= require('gulp-add-src');
var browserSync 		= require('browser-sync').create();
var proxyMiddleware = require('http-proxy-middleware');
var moduleFormats 	= require('js-module-formats');
var runSequence   	= require('run-sequence');
var path				  	= require('path');
var del 						= require('del'); 
var fs            	= require('fs');
var glob            = require('glob');

var config = {
	dev_path: "impl/src/main/resources/web/",
  dist_path: "impl/src/main/javascript/web/"
}

// Default task
gulp.task('default', (done) => {
  runSequence('clean', 'scripts', 'styles', 'inject', done);
});

gulp.task('clean', () => {
	return del.sync([config.dist_path]);
});

gulp.task('scripts', () => {
	return gulp.src(filterScripts().transpile)
		.pipe(babel({
			plugins: ['transform-es2015-modules-amd'],
			presets: ['es2015', 'react']
		}))
		.pipe(add(filterScripts().noTranspile))
		.pipe(debug())
		.pipe(gulp.dest(config.dist_path))
});

gulp.task('styles', () => {
	return gulp.src(config.dev_path + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(config.dist_path))
});

gulp.task('inject', () => {
	var toInject = gulp.src(config.dist_path + '/**/*.css', {read: false});
	return gulp.src(config.dev_path + '/index.html')
		.pipe(inject(toInject, {ignorePath: config.dist_path, addRootSlash: false}))
    .pipe(gulp.dest(config.dist_path))
});

gulp.task('watch', () => {
  browserSync.init({
		proxy: 'http://localhost:9051',
		serveStatic: [config.dist_path]
	});

	gulp.watch(config.dev_path + '/**/*.scss', ['styles', 'reload']);
  gulp.watch(config.dev_path + '/**/*.{js,jsx}', ['scripts', 'reload']);
});

gulp.task('reload', () => {
	browserSync.reload();
});


function filterScripts() {
	var scripts = glob.sync(config.dev_path + '/**/*.{js,jsx}');
	var transpile = [];
	var noTranspile = [];
	scripts.forEach((file) => {
		var source = fs.readFileSync(file, 'utf8');
		var module = moduleFormats.detect(source);
		module === 'amd' ? noTranspile.push(file) : transpile.push(file);
	})
	return {transpile, noTranspile}
}