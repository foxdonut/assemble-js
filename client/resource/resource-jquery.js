var $ = require("jquery");

module.exports = function(baseUrl) {
  return {
    query: function(params) {
      return $.ajax({
        method: "GET",
        url: baseUrl,
        data: params,
        dataType: "json"
      });
    },
    get: function(id) {
      return $.ajax({
        method: "GET",
        url: baseUrl + "/" + id,
        dataType: "json"
      });
    },
    save: function(model) {
      if (model) {
        var request = (model.id) ? {
          method: "PUT",
          url: baseUrl + "/" + model.id
        } : {
          method: "POST",
          url: baseUrl
        };

        request.contentType = "application/json";
        request.data = JSON.stringify(model);
        request.dataType = "json";
        request.processData = false;

        return $.ajax(request);
      }
      var dfd = $.Deferred();
      dfd.reject();
      return dfd.promise();
    },
    "delete": function(model) {
      return $.ajax({
        method: "DELETE",
        url: baseUrl + "/" + model.id
      });
    }
  };
};

