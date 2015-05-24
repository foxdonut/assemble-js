module.exports = function() {
  // fix ls for bind not being in phantomjs
  if (typeof Function.prototype.bind !== "function") {
    Function.prototype.bind = Function.prototype.bind || function(thisp) {
      var fn = this;
      return function() {
        return fn.apply(thisp, arguments);
      };
    };
  }
};
