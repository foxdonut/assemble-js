var gulp = require("gulp");
var $ = require("gulp-load-plugins")({ lazy: true });
var config = require("./gulp.config")();

gulp.task("hello-world", function() {
  console.log("hello gulp");
});

gulp.task("serve-dev", function() {
  return $.nodemon(config.serverOptions);
});
