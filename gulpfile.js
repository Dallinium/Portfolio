var gulp = require('gulp');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

// gulp.task('scripts', function() {
//     return gulp.src('js/scripts.js')
//         .pipe(plumber(plumber({
//             errorHandler: function (err) {
//                 console.log(err);
//                 this.emit('end');
//             }
//         })))
//         .pipe(uglify({
//             output: {
//                 comments: '/^!/'
//             }
//         }))
//         .pipe(rename({extname: '.min.js'}))
//         .pipe(gulp.dest('js'));
// });

function scripts(){
    return gulp.src('js/scripts.js')
        .pipe(plumber(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        })))
        .pipe(uglify({
            output: {
                comments: '/^!/'
            }
        }))
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('js'))
        .pipe(browserSync.stream());
}



// gulp.task('styles', function () {
//     return gulp.src('./scss/styles.scss')
//         .pipe(wait(250))
//         .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
//         .pipe(gulp.dest('./css'));
// });

// gulp.task('watch', function() {
//     gulp.watch('js/scripts.js', gulp.series('scripts'));
//     gulp.watch('scss/styles.scss', gulp.series('styles'));
// });


function style(){
    // 1. where is my scss file
                    // this says include all files with the scss ext in the local scss folder
    return gulp.src('./scss/**/*.scss')
    // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    // 3. where do I save the compiled CSS?
    .pipe(gulp.dest('./css'))
    // 4. stream changes to all browsers
    .pipe(browserSync.stream());
}

// watch for changes and automatically updates instead of typing gulp style everytime
function watch(){
    browserSync.init({
       server: {
           baseDir: './'
       } 
    });
    // watch for any changes in scss and execute style function
    gulp.watch('./scss/**/*.scss', style);
    // only when changes are detected in html file will the browser reload
    gulp.watch('./*html').on('change', browserSync.reload);
    // gulp.watch('./js/scripts.js').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js', scripts);
}

// this is what lets it run in gulp afterwards
exports.style = style;
exports.watch = watch;
exports.scripts = scripts;