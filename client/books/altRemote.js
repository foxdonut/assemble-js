var storeFactory = function(alt, storeHelper, bookActions, bookResource) {
  var fetchBookList = function() {
    bookResource.query().then(bookActions.data);
  };

  var storeConfig = {
    onInitialize: fetchBookList,

    onDeleteBook: function(book) {
      bookResource.delete(book).then(fetchBookList);
    },

    onSaveBook: function(book) {
      bookResource.save(book).then(fetchBookList);
    }
  };

  var Store = storeHelper(storeConfig, bookActions);

  return alt.createStore(Store, "RemoteStore");
};

module.exports = storeFactory;
