var ko = require("knockout");

module.exports = {
  registerAs: function(componentName) {
    ko.components.register(componentName, {
      viewModel: {
        createViewModel: function(params) {
          var viewModel = params.viewModel;

          viewModel.formVisible = ko.observable(false);

          viewModel.book = {
            author: ko.observable(),
            title: ko.observable()
          };
          
          viewModel.newBook = function() {
            viewModel.formVisible(true);
          };
          
          viewModel.saveBook = function() {
            viewModel.formVisible(false);
            return ko.toJS(viewModel.book);
          };
          
          viewModel.cancel = function() {
            viewModel.formVisible(false);
          };

          return viewModel;
        }
      },
      template: require("./template.html")
    });
  }
};
