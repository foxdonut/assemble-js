var $ = require("jquery");

module.exports = function(client) {
  return function(baseUrl) {
    return {
      query: function(params) {
        return client({
          method: "GET",
          path: baseUrl,
          params: params
        });
      },
      get: function(id) {
        return client({
          method: "GET",
          path: baseUrl + "/" + id
        });
      },
      save: function(model) {
        if (model) {
          var request = (model.id) ? {
            method: "PUT",
            path: baseUrl + "/" + model.id
          } : {
            method: "POST",
            path: baseUrl
          };

          request.entity = model;

          return client(request);
        }
        return when.reject();
      },
      "delete": function(model) {
        return client({
          method: "DELETE",
          path: baseUrl + "/" + model.id
        });
      }
    };
  };
};
