const gulp          = require('gulp');
const browserSync   = require('browser-sync');
const sass          = require('gulp-sass');
const cleanCSS      = require('gulp-clean-css');
const autoprefixer  = require('gulp-autoprefixer');
const rename        = require('gulp-rename');
const htmlmin       = require('gulp-htmlmin');
/* const imagemin      = require('gulp-imagemin'); */

 

gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass|css)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css/"))
        .pipe(browserSync.stream());
});



gulp.task('minify', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('icons', function() {
    return gulp.src('src/icons/**/*')
        .pipe(gulp.dest('dist/icons/'))
});


/* 
gulp.task('img', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
  });
 */


gulp.task('js', function() {
    return gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js/'))
});

gulp.task('mailer', function() {
    return gulp.src('src/mailer/**/*')
        .pipe(gulp.dest('dist/mailer/'))
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html", gulp.parallel('minify'));

})

gulp.task('default', gulp.parallel('server', 'styles', 'minify', 'watch'));
gulp.task('deploy', gulp.parallel('fonts',  'icons', /* 'img', */  'js', 'mailer', 'minify'));