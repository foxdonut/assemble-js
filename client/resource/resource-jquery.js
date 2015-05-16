var $ = require("jquery");

module.exports = function(baseUrl) {
  return {
    query: function(params) {
      return $.ajax({
        method: "GET",
        url: baseUrl,
        data: params
      });
    },
    get: function(id) {
      return $.ajax({
        method: "GET",
        url: baseUrl + "/" + id
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

        request.data = model;

        return $.ajax(request);
      }
      return when.reject();
    },
    "delete": function(model) {
      return $.ajax({
        method: "DELETE",
        path: baseUrl + "/" + model.id
      });
    }
  };
};

