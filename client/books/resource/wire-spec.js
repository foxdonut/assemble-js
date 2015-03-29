module.exports = {
  bookResource: {
    create: { $ref: "stir", args: "/books" },
    ready: "query"
  }
};
