var componentRegistry = require("./component/registry");

componentRegistry.register("book-list", require("./books/bookList/template.html"));
componentRegistry.register("book-form", require("./books/bookForm/template.html"));

var ko = require("knockout");
var viewModel = require("./viewModel");
ko.applyBindings({ bookList: viewModel, bookForm: viewModel });

var wireSpec = {
  $plugins: [
    require("wire/aop")/*,
    require("wire/debug")*/
  ],

  bookResource: {
    module: require("./books/resource"),
    ready: "query"
  },

  viewModel: {
    module: viewModel,
    afterFulfilling: {
      "bookResource.query": "bookResource.getEntity | books",
      "bookResource.save": "bookResource.getEntity | addBook"
    },
    afterReturning: {
      deleteBook: "bookResource.delete",
      onSave: "getBook | bookResource.save"
    }
  }
};

var wire = require("wire");
wire(wireSpec);
