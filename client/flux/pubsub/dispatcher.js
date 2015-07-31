var _ = require("lodash-fp");

var dispatcher = function(pubsub) {
  var invokePubsub = function(method, listeners) {
    _.each(function(listener) {
      pubsub[method](listener.eventType, listener.handler);
    })(listeners);
  };

  return {
    register: function(listeners) {
      invokePubsub("subscribe", listeners);
    },
    unregister: function(listeners) {
      invokePubsub("unsubscribe", listeners);
    },
    dispatch: function(eventType, data) {
      pubsub.publish(eventType, data);
    }
  };
};

module.exports = dispatcher;

