var BookEvents = require("./events");

var bookActions = function(dispatcher) {
  return {
    initialize: function() {
      dispatcher.dispatch(BookEvents.READY, {});
    }
  };
};

module.exports = bookActions;
