const gulp = require("gulp");
const webpack = require("webpack-stream");
const gulpSass = require("gulp-sass");
const nodeSass = require("node-sass");
const sass = gulpSass(nodeSass);

const apacheDir = "../../../../../xampp/htdocs/custom-cms/admin"; // Enter your apache path

gulp.task("copy-html", ()=>{
    return gulp.src("./app/src/index.html")
                .pipe(gulp.dest(apacheDir));
});

gulp.task("build-js", () => {
    return gulp.src("./app/src/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }],
                                 "@babel/react"]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(apacheDir));
});

gulp.task("build-sass", () => {
    return gulp.src("./app/scss/style.scss")
                .pipe(sass().on("error", sass.logError))
                .pipe(gulp.dest(apacheDir));
});

gulp.task("copy-api", () => {
    gulp.src("./app/api/**/.*")
                    .pipe(gulp.dest(apacheDir + "/api"))
    return gulp.src("./app/api/**/*.*")
                    .pipe(gulp.dest(apacheDir + "/api"))
});

gulp.task("copy-assets", () => {
    return gulp.src("./app/assets/**/*.*")
                    .pipe(gulp.dest(apacheDir + "/assets"));
});

gulp.task("watch", () => {
    gulp.watch("./app/src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./app/src/**/**.*", gulp.parallel("build-js"));
    gulp.watch("./app/api/**/*.*", gulp.parallel("copy-api"));
    gulp.watch("./app/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./app/scss/**/*.scss", gulp.parallel("build-sass"));
});

gulp.task("build", gulp.parallel("copy-html","build-js","copy-api","copy-assets","build-sass"));

gulp.task("default", gulp.parallel("watch", "build"));