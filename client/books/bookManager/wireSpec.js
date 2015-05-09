var wireSpec = function(bookManagerComponent) {
  return {
    $plugins: [
      require("wire/aop")
    ],

    bookResource: {
      module: require("../resource"),
      ready: "query"
    },

    bookManagerComponent: {
      module: bookManagerComponent,
      afterFulfilling: {
        "bookResource.query": "bookResource.getEntity | setBooks",
        "bookResource.save": "bookResource.getEntity | addOrUpdateBook"
      },
      afterReturning: {
        onDelete: "bookResource.delete"
      }
    }/*,

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
    }*/
  };
};

module.exports = wireSpec;
