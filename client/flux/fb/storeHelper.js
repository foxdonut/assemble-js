var storeHelper = function(pubsub) {
  var CHANGE_EVENT = "change";

  return {
    addChangeListener: function(callback) {
      pubsub.subscribe(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      pubsub.unsubscribe(CHANGE_EVENT, callback);
    },
    emitChange: function(data) {
      pubsub.publish(CHANGE_EVENT, data);
    },
    getState: function() {
      return this.state;
    }
  };
};

module.exports = storeHelper;
