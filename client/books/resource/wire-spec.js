module.exports = {
  $imports: [
    require("../../resource/wire-spec")
  ],

  bookResource: {
    create: { $ref: "stir", args: "/books" },
    ready: "query"
  }
};
