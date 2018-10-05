'use strict';

// REQUISITES

var 	
gulp = require('gulp'),
sass = require('gulp-sass'),
prefix = require('gulp-autoprefixer'),
minify = require('gulp-minify-css');

// PATHS

var
SOURCE		= './source/',
CSS			= SOURCE + 'sass/',
DIST 		= './dist/'
;

// TASKS

gulp.task('default', ['sass'], function(){
	gulp.watch(CSS+'**/*.scss', ['sass']);
});

gulp.task('sass', function() {
	return gulp.src(CSS+'**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefix("last 1 version", "> 1%", "ie 9"))
		.pipe(minify().on('error', function (error) { console.warn(error.message); }))
		.pipe(sass())
			.on('error', sass.logError)
		.pipe(gulp.dest(DIST))
});