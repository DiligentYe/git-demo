// 引包
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


// 1. less文件编译，合并，压缩
// 2. js文件合并，压缩
// 3. html文件压缩
// 4. image压缩

// // 创建一个server
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/images/*.*', ['image']);
});

// 1. less文件编译，压缩
gulp.task('style', function() {
    gulp.src(['src/styles/*.less', '!src/styles/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({
            stream: true
        }));
});

// 2. js文件合并，混淆
gulp.task('script', function() {
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(reload({
            stream: true
        }));
});

// 3. html文件压缩
gulp.task('html', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({
            stream: true
        }));
});

// 4. image复制
gulp.task('image', function() {
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'))
        .pipe(reload({
            stream: true
        }));
});
