define(function(require, exports, module) {

var ko = require("knockout");

module.exports = {
  applyBindings: function() {
    setTimeout(function() {
    console.log("applyBindings");
    ko.applyBindings();
    }, 1000);
  }
};

});
