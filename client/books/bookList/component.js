define(function(require, exports, module) {

module.exports = {
  createComponent: function(viewModel) {
    return {
      viewModel: { instance: viewModel },
      template: require("text!./view.html")
    }
  }
};

});
