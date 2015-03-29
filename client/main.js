module.exports = {
  $imports: [
    { module: require("./books/bookList/wire-spec") }
  ],

  $plugins: [
    require("wire/aop")/*,
    { module: require("wire/debug") }*/
  ]
};
