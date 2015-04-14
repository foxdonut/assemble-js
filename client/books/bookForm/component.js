var ko = require("knockout");

module.exports = {
  registerAs: function(componentName) {
    ko.components.register(componentName, {
      viewModel: {
        createViewModel: function(params) {
          return params.viewModel;
        }
      },
      template: require("./template.html")
    });
  }
};
