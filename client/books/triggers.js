var triggers = function(actions) {
  return {
    editBook: function(book) {
      actions.editBook$.onNext(book);
    },
    deleteBook: function(book) {
      actions.deleteBook$.onNext(book);
    }
  };
};

module.exports = triggers;
