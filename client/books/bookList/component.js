var viewModel = require("./viewModel");
var template = require("./template.html");

var component = function() {
  var vm = viewModel();

  return {
    viewModel: vm,
    template: template
  };
};

module.exports = component;
