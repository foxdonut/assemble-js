var triggers = function(events) {
  return {
    editBook: function(book) {
      events.editBook$.onNext(book);
    },
    deleteBook: function(book) {
      events.deleteBook$.onNext(book);
    },
    saveBook: function(book) {
      events.saveBook$.onNext(book);
    }
  };
};

module.exports = triggers;
