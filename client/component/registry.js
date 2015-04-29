var ko = require("knockout");

module.exports = {
  register: function(componentName, component) {
    ko.components.register(componentName, {
      viewModel: {
        createViewModel: function(params) {
          return params.viewModel;
        }
      },
      template: component.template
    });
  }
};
