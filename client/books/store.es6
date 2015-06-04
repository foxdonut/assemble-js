let _ = require("lodash");
let BookEvents = require("./events");

let store = (pubsub, bookResource) => {
  let bookList = [];

  let publishData = () => {
    pubsub.publish(BookEvents.DATA, bookList);
  };

  let findBookIndex = (book) => {
    return _.findIndex(bookList, {id: book.id});
  };

  let onReady = () => {
    bookResource.query().then((response) => {
      bookList = response;
      publishData();
    });
  };
  pubsub.subscribe(BookEvents.READY, onReady);

  let onDelete = (book) => {
    bookResource.delete(book).then(() => {
      let index = findBookIndex(book);

      if (index >= 0 && index < bookList.length) {
        bookList.splice(index, 1);
        publishData();
      }
    });
  };
  pubsub.subscribe(BookEvents.DELETE, onDelete);

  let onSave = (book) => {
    bookResource.save(book).then((response) => {
      let updatedBook = response;
      let index = findBookIndex(updatedBook);

      if (index >= 0) {
        bookList[index] = updatedBook;
      }
      else {
        bookList.push(updatedBook);
      }
      publishData();
    });
  };
  pubsub.subscribe(BookEvents.SAVE, onSave);
};

module.exports = store;

