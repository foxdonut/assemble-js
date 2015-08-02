var Dispatcher = require("flux").Dispatcher;
var _ = require("lodash-fp");

var dispatcher = new Dispatcher();

var dispatcherHelper = function() {
  return {
    register: function(listeners) {
      var listenerMap = {};

      _.each(function(listener) {
        listenerMap[listener.eventType] = listener.handler;
      })(listeners);

      return dispatcher.register(function(payload) {
        var handler = listenerMap[payload.eventType];

        if (_.isFunction(handler)) {
          handler(payload.data);
        }
      });
    },
    unregister: function(token) {
      dispatcher.unregister(token);
    },
    dispatch: function(eventType, data) {
      dispatcher.dispatch({eventType: eventType, data: data});
    }
  };
};
module.exports = dispatcherHelper;

