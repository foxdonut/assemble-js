var ko = require("knockout");

module.exports = {
  registerAs: function(componentName) {
    ko.components.register(componentName, {
      viewModel: {
        createViewModel: function(params) {
          var viewModel = params.viewModel;

          viewModel.bookFormVisible = ko.observable(false);

          viewModel.book = {
            author: ko.observable(),
            title: ko.observable()
          };
          viewModel.saveBook = function() {
            viewModel.bookFormVisible(false);
            return ko.toJS(viewModel.book);
          };

          return viewModel;
        }
      },
      template: require("./template.html")
    });
  }
};

