var componentRegistry = require("./component/registry");

componentRegistry.register("book-list", require("./books/bookList/template.html"));
componentRegistry.register("book-form", require("./books/bookForm/template.html"));

var ko = require("knockout");
var bookFormViewModel = require("./books/bookForm/viewModel")();
var bookListViewModel = require("./books/bookList/viewModel")();
ko.applyBindings({ bookFormViewModel: bookFormViewModel, bookListViewModel: bookListViewModel });

var wireSpec = {
  $plugins: [
    require("wire/aop")/*,
    require("wire/debug")*/
  ],

  bookResource: {
    module: require("./books/resource"),
    ready: "query"
  },

  bookListViewModel: {
    module: bookListViewModel,
    afterFulfilling: {
      "bookResource.query": "bookResource.getEntity | setBooks",
      "bookResource.save": "bookResource.getEntity | addOrUpdateBook"
    },
    afterReturning: {
      onDelete: "bookResource.delete"
    }
  },

  bookFormViewModel: {
    module: bookFormViewModel,
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

var wire = require("wire");
wire(wireSpec);
