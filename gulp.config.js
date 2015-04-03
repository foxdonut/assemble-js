module.exports = function() {
  var port = process.env.PORT || 4000;
  var ip = process.env.IP || "0.0.0.0";
  var nodeEnv = "dev";

  var config = {
    serverOptions: {
      script: "./server/run.js",
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
