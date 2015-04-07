module.exports = function() {
  var port = process.env.PORT || 3000;
  var ip = process.env.IP || "0.0.0.0";
  var nodeEnv = "dev";

  var config = {
    clientSourceFiles: "client/**/*.js",

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
