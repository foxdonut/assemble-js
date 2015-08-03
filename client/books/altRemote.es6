let storeFactory = (alt, storeHelper, bookActions, bookResource) => {
  let fetchBookList = () => {
    bookResource.query().then((bookList) => {
      bookActions.data(bookList);
    });
  };

  let storeConfig = {
    onInitialize: fetchBookList,

    onDeleteBook: (book) => {
      bookResource.delete(book).then(fetchBookList);
    },

    onSaveBook: (book) => {
      bookResource.save(book).then(fetchBookList);
    },

    bindActions: bookActions
  };

  let store = alt.createStore(storeHelper(storeConfig));

  return store;
};

module.exports = storeFactory;
