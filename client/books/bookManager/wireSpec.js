var viewModel = require("./viewModel")();

var wireSpec = {
  $plugins: [
    require("wire/aop")
  ],

  viewModel: viewModel,

  bookResource: {
    module: require("../resource"),
    ready: "query"
  },

  bookListViewModel: {
    module: viewModel.bookListViewModel,
    afterFulfilling: {
      "bookResource.query": "bookResource.getEntity | setBooks",
      "bookResource.save": "bookResource.getEntity | addOrUpdateBook"
    },
    afterReturning: {
      onDelete: "bookResource.delete"
    }
  },

  bookFormViewModel: {
    module: viewModel.bookFormViewModel,
    afterFulfilling: {
      "bookResource.save": [
        "clearForm",
        "hideForm"
      ]
    },
    afterReturning: {
      "bookListViewModel.onEdit": "editBook",
      onSave: "bookResource.save"
    }
  }
};

module.exports = wireSpec;

