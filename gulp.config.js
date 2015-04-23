module.exports = function() {
  var port = process.env.PORT || 3000;
  var nodeEnv = "dev";

  var config = {
    client: {
      source: {
        files: "client/**",
        generatedFile: "generated-app.js",
        dest: "./public/"
      },
      test: {
        files: "./client/**/*-test.js"
      }
    },

    serverOptions: {
      script: "./server/main.js",
      delayTime: 1,
      env: {
        PORT: port,
        NODE_ENV: nodeEnv
      },
      watch: [ "./server/" ]
    }
  };

  return config;
};
