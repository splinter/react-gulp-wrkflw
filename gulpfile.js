var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var opts = {};
opts.DIST_DIR = './dist';
opts.TEMP_TRANSPILED_REACT_DIR ='./temp';
opts.REACT_COMPONENTS_DIR = './app/js/components';


//TODO:
//1. Support CSS
//2. Add a production distribution task
/**
 * Tasks
 */


gulp.task('serve:dev',function(){
	runSequence('browserSync:init','build:dev','watch:dev')
});

gulp.task('build:dev',function(){
	runSequence('build:dev-bower-dep','build:dev-react-components');
});

gulp.task('build:dev-react-components',function(){
	runSequence('react-babel','react-browserify');
});

gulp.task('build:dev-bower-dep',function(){
	gulp.src('app/index.html')
	.pipe(wiredep())
	.pipe(gulp.dest('dist'));
	//.pipe(browserSync.reload());
});

gulp.task('watch:dev',function(){
  gulp.watch('app/js/components/*.jsx',['build:dev-react-components']);
});

//Transpile React JSX components to JS and
//move the transpiled files to a temp directory
gulp.task('react-babel', function() {
    return gulp.src('app/js/*/*.jsx').pipe(babel({
        presets: ['react']
    })).pipe(gulp.dest('temp/'));
});

//Browserify the transpiled JS files into a bundle file
gulp.task('react-browserify', function() {
	var bundle = browserify('temp/components/App.js',{
		debug:true
	}).bundle();
	bundle.pipe(source('bundle.js'))
		  .pipe(gulp.dest('dist'))
		  .pipe(browserSync.reload({
		  	stream:true
		  }));
});

gulp.task('browserSync:init',function(){
  browserSync.init({
    server:{
      baseDir:'dist',
      routes:{
      	'/bower_components':'bower_components'
      }
    }
  });
});


