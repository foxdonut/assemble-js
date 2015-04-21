var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var browserify = require("browserify");
var vinyl = require("vinyl-source-stream");
var transform = require("vinyl-transform");
var shell = require("shelljs");
var phantomic = require("phantomic");

var config = require("./gulp.config")();

gulp.task("browserify", function() {
  return browserify("./client/main.js")
    .bundle()
    .pipe(vinyl(config.client.source.generatedFile))
    .pipe(gulp.dest(config.client.source.dest));
});

gulp.task("watch", ["browserify"], function() {
  gulp.watch(config.client.source.files, ["browserify"]);
});

gulp.task("browserify-tests", function() {
  var browserified = transform(function(filename) {
    return browserify(filename).bundle();
  });

  return gulp.src(config.client.test.files)
    .pipe(browserified)
    .pipe($.concat(config.client.test.generatedFile))
    .pipe(gulp.dest(config.client.test.dest));
});

gulp.task("test", ["browserify-tests"], function() {
  shell.exec("cat " + config.client.test.dest + config.client.test.generatedFile + " | node_modules/phantomic/bin/cmd.js");
  /*
  return browserifyTests()
    .pipe(function(input) {
      return phantomic(input, {
        debug: false,
        brout: false,
        port: 0
      }, function(code) {
        process.exit(code);
      })
      .pipe(process.stdout);
    });
  */
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
