'use strict';

const gulp		      	= require('gulp');
const babel 					= require('gulp-babel');
const sass 						= require('gulp-sass');
const autoprefixer 		= require('gulp-autoprefixer');
const inject 					= require('gulp-inject');
const debug 					= require('gulp-debug');
const foreach 				= require('gulp-foreach');
const add 						= require('gulp-add-src');
const browserSync 		= require('browser-sync').create();
const moduleFormats 	= require('js-module-formats');
const runSequence   	= require('run-sequence');
const del 						= require('del'); 
const fs            	= require('fs');
const glob            = require('glob');

const DEV_PATH = "impl/src/main/resources/web/";
const DIST_PATH = "impl/src/main/javascript/web/";

// Default task
gulp.task('default', (done) => {
  runSequence('clean', 'scripts', 'styles', 'inject', done);
});

gulp.task('clean', () => {
	return del.sync([DIST_PATH]);
});

gulp.task('scripts', () => {
	return gulp.src(filterScripts().transpile)
		.pipe(babel({
			plugins: ['transform-es2015-modules-amd'],
			presets: ['es2015', 'react']
		}))
		.pipe(add(filterScripts().noTranspile))
		.pipe(debug())
		.pipe(gulp.dest(DIST_PATH))
});

gulp.task('styles', () => {
	return gulp.src(DEV_PATH + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(DIST_PATH))
});

gulp.task('inject', () => {
	var toInject = gulp.src(DIST_PATH + '/**/*.css', {read: false});
	return gulp.src(DEV_PATH + '/index.html')
    .pipe(gulp.dest(DIST_PATH))
});

gulp.task('watch', ['default'], () => {
  browserSync.init({
		proxy: 'http://localhost:9051',
		serveStatic: [DIST_PATH]
	});

	gulp.watch(DEV_PATH + '/**/*.scss', ['styles', 'reload']);
  gulp.watch(DEV_PATH + '/**/*.{js,jsx}', ['scripts', 'reload']);
});

gulp.task('reload', () => {
	browserSync.reload();
});


function filterScripts() {
	let scripts = glob.sync(DEV_PATH + '/**/*.{js,jsx}');
	let transpile = [];
	let noTranspile = [];
	scripts.forEach((file) => {
		let source = fs.readFileSync(file, 'utf8');
		let module = moduleFormats.detect(source);
		module === 'amd' ? noTranspile.push(file) : transpile.push(file);
	})
	return {transpile, noTranspile}
}