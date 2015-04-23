var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });

var browserify = require("browserify");
var glob = require("glob");
var tapeRun = require("tape-run");
var tapSpec = require("tap-spec");
var Q = require("q");

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
  // shell.exec("cat " + config.client.test.dest + config.client.test.generatedFile + " | node_modules/phantomic/bin/cmd.js");
  shell.exec("cat " + config.client.test.dest + config.client.test.generatedFile +
             " | node_modules/tape-run/bin/run.js | node_modules/tap-spec/bin/cmd.js");
});

/*
gulp.task("test1", function() {
  var browserified = vinylTransform(function(filename) {
    return browserify(filename).bundle();
  });

  return gulp.src(config.client.test.files)
    .pipe(browserified)
    .pipe(vts())
    .pipe(tapeRun())
    .pipe(tapSpec())
    .pipe(process.stdout);
});
*/

gulp.task("test2", function(callback) {
  //var deferred = Q.defer();

  glob(config.client.test.files, {}, function(err, files) {
    if (err) {
      throw err;
    }
    var brwsf = browserify();

    files.forEach(function(file) {
      brwsf.add(file);
    });

    var bundle = brwsf.bundle();

    /*
    bundle.on("end", function() {
      deferred.resolve();
    });
    */

    bundle
      //.pipe(storage.createWriteStream())
      //.pipe(runInPhantomic())
      //.pipe(runInPhantomic)
      .pipe(tapeRun())
      .pipe(tapSpec())
      .pipe(process.stdout);

    callback();
  });

  //return deferred.promise;
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
