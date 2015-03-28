module.exports = {
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
  }
};
