define(function(require, exports, module) {

module.exports = {
  bookOutput: {
    module: "books/bookList/output",
    afterFulfilling: {
      "bookResource.query": "log"
    }
  },
  
  bookRegistry: {
    module: require("component/registry"),
    init: {
      register: "book-list"
    }
  }
};  
  
});