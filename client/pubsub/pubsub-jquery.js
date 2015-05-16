var $ = require("jquery");
var $obj = $({});
var callbacks = {};

var pubsub = {
  subscribe: function(topic, callback) {
    var callbackFn = callbacks[callback];

    if (!callbackFn) {
      callbackFn = function(event, data) {
        callback(data.data);
      };
      callbacks[callback] = callbackFn;
    }
    $obj.on(topic, callbackFn);
  },
  unsubscribe: function(topic, callback) {
    $obj.off(topic, callbacks[callback]);
  },
  publish: function(topic, data) {
    $obj.trigger(topic, {data:data});
  }
};

module.exports = pubsub;