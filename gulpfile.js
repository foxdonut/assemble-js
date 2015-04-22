var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var browserify = require("browserify");
var glob = require("glob");
var vinylSource = require("vinyl-source-stream");
var vinylTransform = require("vinyl-transform");
var shell = require("shelljs");
var phantomic = require("phantomic");
var vinylPhantomic = require("vinyl-phantomic");
var enstore = require("enstore");

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

gulp.task("browserify-tests", function() {
  var browserified = vinylTransform(function(filename) {
    return browserify(filename).bundle();
  });

  return gulp.src(config.client.test.files)
    .pipe(browserified)
    .pipe($.concat(config.client.test.generatedFile))
    .pipe(gulp.dest(config.client.test.dest));
});

gulp.task("test", ["browserify-tests"], function() {
  shell.exec("cat " + config.client.test.dest + config.client.test.generatedFile + " | node_modules/phantomic/bin/cmd.js");
});

gulp.task("test2", function(callback) {
  glob(config.client.test.files, {}, function(err, files) {
    if (err) {
      throw err;
    }
    var brwsf = browserify();

    files.forEach(function(file) {
      brwsf.add(file);
    });

    var opts = {
      debug: false,
      port: 0,
      brout: false,
      "web-security": false
    };
    var handler = function(code) {
      process.exit(code);
    };
    var runInPhantomic = function() {
      return phantomic(storage.createReadStream(), opts, handler);
    };

    var storage = enstore();
    brwsf.bundle().pipe(storage.createWriteStream());
    runInPhantomic().pipe(process.stdout);

    callback();
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
