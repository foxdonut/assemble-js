var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var browserify = require("browserify");
var vinyl = require("vinyl-source-stream");

var config = require("./gulp.config")();

gulp.task("hello-world", function() {
  console.log("hello gulp");
});

gulp.task("browserify", function() {
  return browserify("./client/main.js")
    .bundle()
    .pipe(vinyl("generated-app.js"))
    .pipe(gulp.dest("./client/"));
});

gulp.task("watch", function() {
  gulp.watch(config.clientSourceFiles, ["browserify"]);
});

gulp.task("serve-dev", ["browserify"], function() {
  return $.nodemon(config.serverOptions)
    .on("start", ["watch"]);
});

gulp.task("default", ["serve-dev"]);
