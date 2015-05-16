var $ = require("jquery");

var pubsub = {
  subscribe: function(topic, callback) {
    $.on(topic, callback);
  },
  unsubscribe: function(topic, callback) {
    $.off(topic, callback);
  },
  publish: function(topic, data) {
    $.trigger(topic, data);
  }
};

module.exports = pubsub;