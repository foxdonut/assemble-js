var ko = require("knockout");

module.exports = {
  register: function(componentName, template) {
    ko.components.register(componentName, {
      viewModel: {
        createViewModel: function(params) {
          return params.viewModel;
        }
      },
      template: template
    });
  }
};
