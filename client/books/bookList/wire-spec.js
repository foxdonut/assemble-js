var _ = require("lodash");

module.exports = _.extend({
  $plugins: [
    require("wire/aop")
  ]},

  require("../resource/wire-spec"), {

  bookListViewModel: {
    module: require("./viewModel"),
    
    afterFulfilling: {
      "bookResource.query": "bookResource.getEntity | books"
    },
    
    afterReturning: {
      deleteBook: "bookResource.delete"
    }
  },

  bookListRegistry: {
    module: require("../../component/registry"),
    init: {
      register: [ "book-list", { $ref: "bookListViewModel" }, require("./view.html") ]
    }
  }
});
