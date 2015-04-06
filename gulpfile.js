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

gulp.task("serve-dev", function() {
  return $.nodemon(config.serverOptions);
});

gulp.task("default", ["browserify"]);
