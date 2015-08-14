var triggers = function(actions) {
  return {
    editBook: function(book) {
      actions.editBook$.onNext(book);
    },
    deleteBook: function(book) {
      actions.deleteBook$.onNext(book);
    },
    saveBook: function(book) {
      actions.saveBook$.onNext(book);
    }
  };
};

module.exports = triggers;
