module.exports = {
  $imports: [
    require("../../resource/wire-spec")
  ],

  bookResource: {
    create: { $ref: "stir", args: "/books" },
    ready: "query"
  },
  
  bookOutput: {
    module: require("./output"),
    afterFulfilling: {
      "bookResource.query": "log"
    }
  },
  
  bookRegistry: {
    module: require("./registry"),
    init: {
      register: "book-list"
    }
  }
};
