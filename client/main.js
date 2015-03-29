module.exports = {
  $imports: [
    { module: require("./books/resource/wire-spec") }
  ],

  $plugins: [
    require("wire/aop")/*,
    { module: require("wire/debug") }*/
  ]
};
