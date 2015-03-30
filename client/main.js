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

//module.exports = {
  /*
  $imports: [
    { module: require("./resource/wire-spec") },
    { module: require("./books/resource/wire-spec") },
    { module: require("./books/bookList/wire-spec") }
  ],
  */

  /*
  $imports: [
    require("./resource/wire-spec"),
    require("./books/resource/wire-spec"),
    require("./books/bookList/wire-spec")
  ],
  */

  /*
  $imports: [
    { module: "./resource/wire-spec" },
    { module: "./books/resource/wire-spec" },
    { module: "./books/bookList/wire-spec" }
  ],
  */

  /*
  $imports: [
    "./resource/wire-spec",
    "./books/resource/wire-spec",
    "./books/bookList/wire-spec"
  ],
  */  
//};
