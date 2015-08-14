var _ = require("lodash");

var actions = function(events) {
  return {
    editBook: function(book) {
      events.editBook$.onNext(_.extend({}, book));
    },
    editingBook: function(book) {
      events.editingBook$.onNext(book);
    },
    deleteBook: function(book) {
      events.deleteBook$.onNext(book);
    },
    saveBook: function(book) {
      events.saveBook$.onNext(book);
    }
  };
};

module.exports = actions;
