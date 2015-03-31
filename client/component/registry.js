var ko = require("knockout");

module.exports = {
  register: function(componentName, viewModel, template) {
    console.log("register:", componentName);
    ko.components.register(componentName, {
      viewModel: { instance: viewModel },
      template: template
    });
  }
};
