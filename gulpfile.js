var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var browserify = require("browserify");
var vinylSource = require("vinyl-source-stream");
var vinylTransform = require("vinyl-transform");

var tapeRun = require("tape-run");
var tapSpec = require("tap-spec");
var faucet = require("faucet");
var through = require("through");

var config = require("./gulp.config")();

gulp.task("browserify", function() {
  return browserify("./client/main.js")
    .bundle()
    .pipe(vinylSource(config.client.source.generatedFile))
    .pipe(gulp.dest(config.client.source.dest));
});

gulp.task("watch", ["browserify"], function() {
  gulp.watch(config.client.source.files, ["browserify"]);
});

var browserified = function() {
  return vinylTransform(function(filename) {
    return browserify(filename).bundle();
  });
};

var runTests = function(vinyl) {
  return vinyl.pipe(tapeRun()).pipe(tapSpec()).pipe(process.stdout);
};

gulp.task("test", function() {
  return gulp.src([config.client.test.files])
    .pipe(browserified())
    .pipe($.concat("generated-tests.js"))
    .pipe(through(runTests));
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

