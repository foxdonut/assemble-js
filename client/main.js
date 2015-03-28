module.exports = {
  $imports: [
    { module: require("./resource/wire-spec") }
  ],

  $plugins: [
    { module: require("wire/aop") },
    { module: require("wire/debug") }
  ]
};
