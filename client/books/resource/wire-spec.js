define(function(require, exports, module) {

var _ = require("lodash");

module.exports = _.extend(
  require("../../resource/wire-spec"), {

  bookResource: {
    create: { $ref: "stir", args: "/books" },
    ready: "query"
  }
});

});
