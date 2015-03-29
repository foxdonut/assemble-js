define(function(require, exports, module) {

module.exports = {
  /*
  $imports: [
    "resource/wire-spec",
    "books/resource/wire-spec",
    "books/bookList/wire-spec"
  ],
  */

  $imports: [
    require("resource/wire-spec"),
    require("books/resource/wire-spec"),
    require("books/bookList/wire-spec")
  ],

  $plugins: [
    "wire/aop"/*,
    "wire/debug"*/
  ]
};

});
