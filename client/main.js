module.exports = {
  $imports: [
    { module: require("./resource/wire-spec") }
  ],

  $plugins: [
    require("wire/aop")/*,
    { module: require("wire/debug") }*/
  ]
};
