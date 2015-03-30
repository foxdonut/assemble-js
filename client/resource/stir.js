define(function(require, exports, module) {

var when = require("when");

module.exports = function(client) {
  return function(baseUrl) {
    return {
      query: function(params) {
        console.log("query:", params);
        return client({
          method: "GET",
          path: baseUrl,
          params: params
        });
      },
      get: function(id) {
        console.log("get:", id);
        return client({
          method: "GET",
          path: baseUrl + "/" + id
        });
      },
      save: function(model) {
        console.log("save:", model);
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
        console.log("delete:", model);
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
