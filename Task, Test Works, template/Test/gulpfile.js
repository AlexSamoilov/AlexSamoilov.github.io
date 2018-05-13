var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('sync',function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('less', function () {
    return gulp.src('css/style.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(autoprefixer(['last 18 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream())
});

gulp.task('watch', ['sync','less'], function () {
    gulp.watch('css/**/*.less', ['less']);
    gulp.watch('./**/*.html', browserSync.reload);
});

gulp.task('default', ['watch']);
