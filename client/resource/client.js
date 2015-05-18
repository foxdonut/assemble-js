module.exports = function() {
  var when = require("when");
  var browser = require("rest/browser");
  var mime = require("rest/interceptor/mime");
  var restClient = browser.wrap(mime, { mime: "application/json" });

  var client = function(request) {
    var dfd = when.defer();

    restClient(request).then(function(response) {
      dfd.resolve(response.entity);
    }, function(error) {
      dfd.reject(error);
    });

    return dfd.promise;
  };
  return client;
};
