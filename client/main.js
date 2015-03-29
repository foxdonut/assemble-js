module.exports = {
  /*
  $imports: [
    { module: require("./resource/wire-spec") },
    { module: require("./books/resource/wire-spec") },
    { module: require("./books/bookList/wire-spec") }
  ],
  */

  $imports: [
    require("./resource/wire-spec"),
    require("./books/resource/wire-spec"),
    require("./books/bookList/wire-spec")
  ],

  $plugins: [
    require("wire/aop")/*,
    { module: require("wire/debug") }*/
  ]
};
