var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var browserify = require("browserify");
var vinylSource = require("vinyl-source-stream");

var glob = require("glob");
var tapeRun = require("tape-run");
var tapSpec = require("tap-spec");
var faucet = require("faucet");

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

gulp.task("test", function() {
  glob(config.client.test.files, {}, function(err, files) {
    if (err) {
      throw err;
    }
    var brwsf = browserify();

    files.forEach(function(file) {
      brwsf.add(file);
    });

    brwsf.bundle()
      .pipe(tapeRun())
      .pipe(faucet())
      //.pipe(tapSpec())
      .pipe(process.stdout);

  });
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
