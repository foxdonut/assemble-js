var _ = require("lodash");

module.exports = _.extend(
  {
    $plugins: [
      require("wire/aop")/*,
      require("wire/debug")*/
    ]
  },
  require("./resource/wire-spec"),
  require("./books/resource/wire-spec"),
  require("./books/bookList/wire-spec")
);
