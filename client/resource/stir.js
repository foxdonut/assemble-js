define(function(require, exports, module) {

var when = require("when");

module.exports = function(client) {
  console.log("** stir client created.");
  return function(baseUrl) {
    return {
      query: function(params) {
        console.log("query");
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
      },
      getEntity: function(response) {
        return response.entity;
      }
    };
  };
};

});