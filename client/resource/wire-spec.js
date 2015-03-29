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
  }
};
