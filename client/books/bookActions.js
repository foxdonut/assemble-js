var BookEvents = require("./events");

var bookActions = function(dispatcher) {
  return {
    initialize: function() {
      dispatcher.dispatch(BookEvents.READY, {});
    },
    deleteBook: function(book) {
      dispatcher.dispatch(BookEvents.DELETE, book);
    },
    saveBook: function(book) {
      dispatcher.dispatch(BookEvents.SAVE, book);
    }
  };
};

module.exports = bookActions;
