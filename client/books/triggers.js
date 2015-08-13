var triggers = function(actions) {
  return {
    editBook: function(book) {
    },
    deleteBook: function(book) {
      actions.deleteBook$.onNext(book);
    }
  };
};

module.exports = triggers;
