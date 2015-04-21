var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var browserify = require("browserify");
var vinyl = require("vinyl-source-stream");
var transform = require("vinyl-transform");
var shell = require("shelljs");

var config = require("./gulp.config")();

gulp.task("hello-world", function() {
  console.log("hello gulp");
});

gulp.task("browserify", function() {
  return browserify("./client/main.js")
    .bundle()
    .pipe(vinyl("generated-app.js"))
    .pipe(gulp.dest("./public/"));
});

gulp.task("watch", ["browserify"], function() {
  gulp.watch(config.clientSourceFiles, ["browserify"]);
});

gulp.task("browserify-test", function() {
  var browserified = transform(function(filename) {
    return browserify(filename).bundle();
  });

  return gulp.src(["./client/**/*-test.js"])
    .pipe(browserified)
    // .pipe(vinyl("generated-test.js"))
    .pipe(gulp.dest("./generated-test/"));
});

gulp.task("test", ["browserify-test"], function() {
  shell.exec("node_modules/tape/bin/tape test/**/*-test.js | node_modules/faucet/bin/cmd.js");
});

var serve = function(watch) {
  return $.nodemon(config.serverOptions);
};

gulp.task("serve", ["browserify"], function() {
  return serve(false);
});

gulp.task("serve-dev", ["watch"], function() {
  return serve(true);
});

gulp.task("default", ["serve-dev"]);
