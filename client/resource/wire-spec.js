module.exports = {
  $plugins: [
    { module: require("wire/aop") }
  ],

  client: {
    create: {
      module: require("./client")
    }
  },

  stir: {
    create: {
      module: require("./stir"),
      args: { $ref: "client" }
    }
  },

  bookResource: {
    create: { $ref: "stir", args: "/books" },
    ready: "query"
  },
  
  bookOutput: {
    module: require("./output"),
    afterFulfilling: {
      "bookResource.query": "log"
    }
  }
};
