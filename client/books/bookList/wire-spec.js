module.exports = {
  bookOutput: {
    module: require("./output"),
    afterFulfilling: {
      "bookResource.query": "log"
    }
  },
  
  bookRegistry: {
    module: require("../../component/registry"),
    init: {
      register: "book-list"
    }
  }
};
