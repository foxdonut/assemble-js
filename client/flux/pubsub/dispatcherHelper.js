var _ = require("lodash-fp");

var dispatcherHelper = function(pubsub) {
  var invokePubsub = function(method, listeners) {
    _.each(function(eventName, callback) {
      pubsub[method](eventName, callback);
    })(listeners);
  };

  return {
    register: function(listeners) {
      invokePubsub("subscribe", listeners);
    },
    unregister: function(listeners) {
      invokePubsub("unsubscribe", listeners);
    },
    dispatch: function(eventName, data) {
      pubsub.publish(eventName, data);
    }
  };
};

module.exports = dispatcherHelper;

