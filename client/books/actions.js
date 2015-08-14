var _ = require("lodash");

var actions = function(events) {
  return {
    editBook: function(book) {
      events.editBook$.onNext({editing:true, book:_.extend({}, book)});
    },
    editingBook: function(editingBookData) {
      events.editingBook$.onNext(editingBookData);
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
