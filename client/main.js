var ko = require("knockout");

require("./books/bookList/component").registerAs("book-list");

var viewModel = require("./viewModel");
ko.applyBindings(viewModel);

module.exports = {
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
    }
  },
};
