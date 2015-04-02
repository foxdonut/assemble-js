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
  
  // fix for sinon fake xhr not working
  if (typeof window.ProgressEvent !== "function") {
    window.ProgressEvent = function(type, params) {
      params = params || {};

      this.lengthComputable = params.lengthComputable || false;
      this.loaded = params.loaded || 0;
      this.total = params.total || 0;
    };
  }
};
