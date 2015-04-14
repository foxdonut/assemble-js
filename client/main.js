require("./books/bookList/component").registerAs("book-list");
require("./books/bookForm/component").registerAs("book-form");

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
