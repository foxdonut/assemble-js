module.exports = {
  $imports: [
    { module: require("./resource/wire-spec") }
  ],

  $plugins: [
    { module: require("wire/debug") }
  ],

  onReady: {
    module: require("./ready"),
    ready: "onReady"
  }
};
