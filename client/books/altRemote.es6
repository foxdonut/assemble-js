let storeFactory = (alt, storeHelper, bookActions, bookResource) => {
  let fetchBookList = () => {
    console.log("fetchBookList");
    bookResource.query().then((bookList) => {
      console.log("received:", bookList);
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

  let store = alt.createStore(storeHelper(storeConfig), "RemoteStore");

  return store;
};

module.exports = storeFactory;
