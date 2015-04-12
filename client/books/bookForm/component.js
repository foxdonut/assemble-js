var ko = require("knockout");

module.exports = {
  registerAs: function(componentName) {
    ko.components.register(componentName, {
      viewModel: {
        createViewModel: function(params) {
          var viewModel = params.viewModel;

          viewModel.newBookFormVisible = ko.observable(false);
          viewModel.showNewBookForm = function() {
            viewModel.newBookFormVisible(true);
          };
          viewModel.hideNewBookForm = function() {
            viewModel.newBookFormVisible(false);
          };

          return viewModel;
        }
      },
      template: require("./template.html")
    });
  }
};
