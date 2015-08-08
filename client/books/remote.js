var storeFactory = function(alt, bookActions, bookResource) {
  var fetchBookList = function() {
    bookResource.query().then(bookActions.data);
  };

  var storeConfig = {
    bindListeners: {
      onInitialize: bookActions.initialize,
      onDeleteBook: bookActions.deleteBook,
      onSaveBook: bookActions.saveBook
    },

    onInitialize: fetchBookList,

    onDeleteBook: function(book) {
      bookResource.delete(book).then(fetchBookList);
    },

    onSaveBook: function(book) {
      bookResource.save(book).then(fetchBookList);
    }
  };

  return alt.createStore(storeConfig, "RemoteStore");
};

module.exports = storeFactory;
