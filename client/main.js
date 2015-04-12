require("./books/bookList/component").registerAs("book-list");

var ko = require("knockout");
var viewModel = require("./viewModel");
ko.applyBindings({ bookList: viewModel });

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
      "bookResource.query": "bookResource.getEntity | books"
    },
    afterReturning: {
      deleteBook: "bookResource.delete"
    }
  }
};

var wire = require("wire");
wire(wireSpec);

