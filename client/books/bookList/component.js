var ko = require("knockout");

module.exports = {
  registerAs: function(componentName) {
    ko.components.register(componentName, {
      viewModel: require("./viewModel"),
      template: require("./template")
    });
  }
};
