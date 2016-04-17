var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var transform = require('vinyl-transform');
var watchify = require('watchify');
var uglify = require('gulp-uglify');
var wiredep = require('wiredep').stream;

gulp.task('babel-react', function() {
    console.log('This is a test');
    return gulp.src('./app/js/components/*.jsx').pipe(babel({
        presets: ['react']
    })).pipe(gulp.dest('.temp/'));
});

gulp.task('concat',function(){
	return gulp.src(['.temp/*.js'])
		.pipe(concat('app.js'))
});

gulp.task('browserify', function() {
	// var browserified = transform(function(filename){
	// 	var b = browserify(filename);
	// 	return b.bundle();
	// });

	// return gulp.src(['temp/main.js'])
	// 		.pipe(browserified)
	// 		.pipe(gulp.dest('dist/bundle.js'));
	var bundle = browserify('temp/main.js',{
		debug:true
	}).bundle();
	bundle.pipe(source('bundle.js'))
		  .pipe(gulp.dest('dist'));
});

gulp.task('bower',function(){
	gulp.src('app/index.html')
	.pipe(wiredep())
	.pipe(gulp.dest('dist'));
});


gulp.task('watch', function() {

  var watcher  = watchify(browserify({
    entries: ['.temp/Test.js'],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('dist/src'))
      console.log('Updated');
  })
    .bundle()
    .pipe(source('build.js'))
    .pipe(gulp.dest('dist/src'));
});

