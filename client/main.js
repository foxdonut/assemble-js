var _ = require("lodash");

module.exports = _.extend(
  {
    $plugins: [
      require("wire/aop")/*,
      require("wire/debug")*/
    ]
  },
  require("./books/bookList/wire-spec")
);
