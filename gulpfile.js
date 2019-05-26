
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var glob = require('glob');
var sass = require('gulp-sass')
var cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify'), concat = require('gulp-concat');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');



gulp.task('sass', function () {
   return gulp.src('./source/styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/stylesheets'))
        
});


// Hack the ability to import directories in Sass
// Find any _all.scss files and write @import statements
// for all other *.scss files in the same directory
//
// Import the whole directory with @import "somedir/all";
gulp.task('sass-includes', function (callback) {
    var all = '_all.scss';
    glob('./source/styles/**/' + all, function (error, files) {
        files.forEach(function (allFile) {
            // Add a banner to warn users
            fs.writeFileSync(allFile, '/** This is a dynamically generated file **/\n\n');

            var directory = path.dirname(allFile);
            var partials = fs.readdirSync(directory).filter(function (file) {
                return (
                    // Exclude the dynamically generated file
                    file !== all &&
                    // Only include _*.scss files
                    path.basename(file).substring(0, 1) === '_' &&
                    path.extname(file) === '.scss'
                );
            });

            // Append import statements for each partial
            partials.forEach(function (partial) {
                fs.appendFileSync(allFile, '@import "' + partial + '";\n');
            });
        });
    });

    callback();
});


gulp.task('autoprefixer', function () {

    return gulp.src('./public/stylesheets/style.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('minify-css', function () {
    return gulp.src('./source/process/styles/preFixedandSourced/style.css')
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./source/process/styles/minified'));
});


gulp.task('build-js', function () {
    gulp.src(['./source/scripts/**/*.js ', './source/scripts/*.js'])
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/javascripts/'))
});


// gulp.task('app_build_css', ['sass', 'autoprefixer'], function () {
//     return gulp.src('./source/process/styles/preFixedandSourced/*.css')

//         //.pipe(concat('style.css'))

//         .pipe(gulp.dest('./public/stylesheets'));
// });


gulp.task('watch', function () {
    gulp.watch('./source/styles/**/!(_all).scss', ['app_build_css']);
    // gulp.watch('./source/scripts/*.js', ['build-js']);
});



