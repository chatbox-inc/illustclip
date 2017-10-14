var gulp = require("gulp");
var scss = require("gulp-sass");
var browserSync = require("browser-sync");
var plumber = require("gulp-plumber"); //scssとpugの変換でエラーが出た場合の強制終了を防止
var notify = require("gulp-notify"); //デスクトップ通知を行う
var pug = require("gulp-pug");
var path = require("path")
var sourcemaps = require("gulp-sourcemaps")

gulp.task('default', ['build', 'browser-sync', 'watch']); //コマンドプロンプトからgulpと実行された場合に行うタスクの一覧
gulp.task('build',['scss','pug'])

//scssとpugの監視をして変換処理させる
gulp.task('watch', () => {
    gulp.watch([path.resolve('./src/scss/**/*.scss')], () => {
        gulp.start(['scss']);
    });
    gulp.watch([path.resolve('./src/pug/**/*.pug')], () => {
        gulp.start(['pug']);
    });
});

//scssをcssに変換
gulp.task("scss", () => {
    gulp.src(path.resolve('./src/scss/**/*.scss'))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(scss())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest("./dist/views/css"))
});

//pugをhtmlに変換
gulp.task("pug", () => {
    gulp.src([
        './src/pug/**/*.pug',
        '!./src/pug/**/_*.pug',
    ])
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(pug({
            locals:{
                page:{}
            },
            pretty: true
        }))
        .pipe(gulp.dest("./dist/views"))
});


//ブラウザ表示
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: "./dist/views",   //ブラウザに表示するディレクトリ
        },
        open: "external"  //externalのアドレスで開く
    });
    //ファイルの監視
    //以下のファイルが変わったらリロードする
    gulp.watch(path.resolve("./dist/views/js/*.js"),       ['reload']);
    gulp.watch(path.resolve("./dist/views/*.html"),        ['reload']);
    gulp.watch(path.resolve("./dist/views/css/*.css"),     ['reload']);
});

//ブラウザリロード処理
gulp.task('reload', () => {
    setTimeout(function(){
        browserSync.reload();
    },500)
});