var gulp = require('gulp');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlReplace = require('gulp-html-replace');
var browserSync = require('browser-sync');
//创建默认任务
//在执行default配置其他需要执行的任务
gulp.task('default',['copy','less','html','js'],function () {
    //以上完成了build 打包
    //5. 编码过程中自动打包
    // watch(‘监听的文件’，‘文件改变执行的任务’)
    gulp.watch('src/less/**/*.less',['less']);
    gulp.watch('src/**/*.html',['html']);
    gulp.watch('src/js/**/*.js',['js']);
    //6. 编码过程中浏览器重载
    //6.1 起动一个服务
    browserSync({
        server:{
            baseDir:'dist'
        }
    });
});
/*构建需求*/
/*1. less打包*/
/*1.1 解析less   gulp-less*/
/*1.2 加私有前缀  gulp-autoprefixer*/
/*1.3 压缩        gulp-cssmin*/
/*1.4 输出dist中的css目录*/
gulp.task('less',function () {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers:['last 100 versions']
        }))
        .pipe(cssmin())
        //less的导入文件没有打包进去
        //gulp-less 4.0.0 版本的BUG
        //希望大家去下载 3.5.0
        .pipe(gulp.dest('dist/css'))
        //同步到浏览器
        //.pipe(browserSync.reload({'stream':true}));
        .pipe(browserSync.stream());
});
/*2. html打包*/
/*2.1 替换路径 gulp-html-replace */
/*2.2 压缩html gulp-htmlmin */
/*2.3 输出dist中的目录*/
gulp.task('html',function () {
    gulp.src('src/**/*.html')
        .pipe(htmlReplace({
            'css':'css/index.css',//将要去替换的路径
            'js':'assets/zepto/all.js'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 设置参数去除空白
            minifyJS: true,           // 压缩html中的js
            minifyCSS: true,          // 压缩html中的css
            removeComments: true      // 去除html注释
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

/*3. js打包*/
/*3.1 js目录需要去压缩*/
/*3.2 输出dist中的js目录*/
/*3.3 src/assets/zepto 合并*/
/*3.4 src/assets/zepto 压缩*/
/*3.5 src/assets/zepto 输出到 dist/assets*/
gulp.task('js',['js-min','zepto-concat']);
gulp.task('js-min',function () {
    gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});
gulp.task('zepto-concat',function () {
    //合并的时候 会默认安照文件的顺序打包 要注意文件的依赖关系
    gulp.src(['src/assets/zepto/zepto.min.js','src/assets/zepto/fx.js','src/assets/zepto/selector.js','src/assets/zepto/touch.js'])
        //合并文件 设置文件名称
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/zepto'));
});

//4. 拷贝任务
gulp.task('copy',function () {
    gulp.src('src/images/**')
        .pipe(gulp.dest('dist/images'));
});