define(function(require, exports, module) {

var counter = 1;
module.exports = {
  register: function(componentName) {
    console.log("register:", (counter++), componentName);
  }
};

});