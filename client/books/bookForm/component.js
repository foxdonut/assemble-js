var ko = require("knockout");

module.exports = {
  registerAs: function(componentName) {
    ko.components.register(componentName, {
      viewModel: {
        createViewModel: function(params) {
          var viewModel = params.viewModel;

          viewModel.formVisible = ko.observable(false);
          viewModel.hideForm = function() { viewModel.formVisible(false); };
          viewModel.showForm = function() { viewModel.formVisible(true); };

          viewModel.book = {
            author: ko.observable(),
            title: ko.observable()
          };
          
          viewModel.newBook = function() {
            viewModel.showForm();
          };
          
          viewModel.saveBook = function() {
            viewModel.hideForm();
            return ko.toJS(viewModel.book);
          };
          
          viewModel.cancel = function() {
            viewModel.hideForm();
          };

          return viewModel;
        }
      },
      template: require("./template.html")
    });
  }
};
