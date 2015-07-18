require("whatwg-fetch");

module.exports = function(baseUrl) {
  var toJson = function(response) {
    return response.json();
  };
  return {
    query: function(params) {
      return fetch(baseUrl, {body: params}).then(toJson);
    },
    get: function(id) {
      return fetch(baseUrl + "/" + id).then(toJson);
    },
    save: function(model) {
      if (model) {
        var url = baseUrl + (model.id ? ("/" + model.id) : "");
        var method = model.id ? "PUT" : "POST";
        var request = {
          method: method,
          headers: {
           "Accept": "application/json",
           "Content-Type": "application/json"
          },
          body: JSON.stringify(model)
        };

        return fetch(url, request);
      }
    },
    "delete": function(model) {
      return fetch(baseUrl + "/" + model.id, {method: "DELETE"});
    }
  };
};

