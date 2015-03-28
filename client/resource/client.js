module.exports = function() {
  var browser = require("rest/browser");
  var mime = require("rest/interceptor/mime");
  var client = browser.wrap(mime, { mime: "application/json" });

  return client;
};
