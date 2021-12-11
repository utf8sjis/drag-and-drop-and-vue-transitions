const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const svgo = require('imagemin-svgo');
const del = require('del');


// scssファイルの変更を監視しcssファイルを生成する
const compileSass = () =>
  gulp.watch('app/static/scss/**/*.scss', () =>
    gulp.src('app/static/scss/style.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app/static/css/')));


// jsファイルを除くdist以下のファイルを削除する
const clean = () => del([
  'dist/**',
  'dist/static/**',
  '!dist/static',
  '!dist/static/js',
]);


// cssファイルを圧縮する
const minifyCSS = () =>
  gulp.src('app/static/css/style.css')
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest('dist/static/css/'));


// htmlファイル内のパスを置換し圧縮する
const minifyHTML = () =>
  gulp.src('app/*.html')
    .pipe(replace(
      'https://unpkg.com/vue@3.2.23/dist/vue.global.js',
      'https://unpkg.com/vue@3.2.23/dist/vue.global.prod.js'))
    .pipe(replace(
      './static/js/main.js',
      './static/js/main.min.js'))
    .pipe(replace(
      './static/css/style.css',
      './static/css/style.min.css'))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('dist/'));


// 画像を圧縮する
const minifyImage = () =>
  gulp.src('app/static/img/**')
    .pipe(imagemin([
      pngquant({
        quality: [.65, .80],
        speed: 1,
      }),
      svgo(),
    ]))
    .pipe(gulp.dest('dist/static/img/'));


// ファイルのdistへのコピー
const copyToDist = () =>
  gulp.src([
    'app/**',
    '!app/static/scss/**',
    '!app/static/css/**',
    '!app/static/js/**',
    '!app/static/img/**',
    '!app/*.html',
  ], {
    base: 'app/',
  })
    .pipe(gulp.dest('dist/'));


exports.default = compileSass;
exports.build = gulp.series(
  clean, minifyCSS, minifyHTML, minifyImage, copyToDist);
