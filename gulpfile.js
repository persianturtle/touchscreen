var gulp = require('gulp');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var css = require('gulp-concat-css');

gulp.task('scripts', function() {
	return gulp.src(
		[
			'./bower_components/angular/angular.min.js',
			'./bower_components/angular-route/angular-route.min.js',
			'./bower_components/angular-touch/angular-touch.min.js',
			'./bower_components/angular-animate/angular-animate.min.js',
			'./js/app.js',
			'./js/*.js',
			'./projects/**/*.js'
		])
		.pipe(concat('app.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./bundle'));
});

gulp.task('styles', function() {
	return gulp.src(
		[
			'./bower_components/bootstrap/dist/css/bootstrap.min.css',
			'./css/styles.css',
			'./projects/**/*.css'
		])
		.pipe(css('styles.css'))
		.pipe(cleanCss({compatibility: 'ie9'}))
		.pipe(gulp.dest('./bundle'));
});

gulp.task('default', ['styles', 'scripts', 'watch']);

gulp.task('watch', function() {
	gulp.watch([
		'./js/*.js',
		'./css/*.css',
		'./projects/**/*.css'
	], ['styles', 'scripts']);
});
