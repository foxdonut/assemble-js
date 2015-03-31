define(function(require, exports, module) {

var _ = require("lodash");

module.exports = _.extend(
  require("../resource/wire-spec"), {

  bookListViewModel: {
    module: require("./viewModel"),
    
    afterFulfilling: {
      "bookResource.query": "bookResource.getEntity | books"
    },
    
    afterReturning: {
      /*
      deleteBook: "log",
      log: "bookResource.delete"
      */
      deleteBook: "bookResource.delete"
    }
  },

  bookListRegistry: {
    module: require("../../component/registry"),
    init: {
      register: [ "book-list", require("./component") ]
    }
  }
});

});
