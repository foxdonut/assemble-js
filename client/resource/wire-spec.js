define(function(require, exports, module) {

module.exports = {
  $plugins: [
    "wire/aop"
  ],

  client: {
    create: {
      module: "resource/client"
    }
  },

  stir: {
    create: {
      module: "resource/stir",
      args: { $ref: "client" }
    }
  },
};

});