var radio = require("radio");

var pubsub = {
  subscribe: function(topic, callback) {
    radio(topic).subscribe(callback);
  },
  unsubscribe: function(topic, callback) {
    radio(topic).unsubscribe(topic, callback);
  },
  publish: function(topic, data) {
    radio(topic).broadcast(data);
  }
};

module.exports = pubsub;