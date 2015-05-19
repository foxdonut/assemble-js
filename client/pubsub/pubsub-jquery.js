var $ = require("jquery");
var $obj = $({});

var pubsub = {
  subscribe: function(topic, callback) {
    var callbackFn = function(event, data) {
      if (data) {
        callback(data.data);
      }
      else {
        callback();
      }
    };
    callback.callbackFn = callbackFn;
    $obj.on(topic, callbackFn);
  },
  unsubscribe: function(topic, callback) {
    $obj.off(topic, callback.callbackFn);
  },
  publish: function(topic, data) {
    $obj.trigger(topic, {data: data});
  }
};

module.exports = pubsub;