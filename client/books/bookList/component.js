define(function(require, exports, module) {

module.exports = {
  viewModel: { instance: require("./viewModel") },
  template: require("text!./view.html")
};

});
