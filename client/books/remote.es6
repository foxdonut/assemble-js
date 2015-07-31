let BookEvents = require("./events");

let remote = (bookResource, dispatcher) => {
  let fetchBookList = () => {
    bookResource.query().then((bookList) => {
      dispatcher.dispatch(BookEvents.DATA, bookList);
    });
  };

  let onDelete = (book) => {
    bookResource.delete(book).then(() => {
      fetchBookList();
    });
  };

  let onSave = (book) => {
    bookResource.save(book).then((response) => {
      fetchBookList();
    });
  };

  let readyEvent = BookEvents.READY;
  let deleteEvent =  BookEvents.DELETE;
  let saveEvent = BookEvents.SAVE;

  dispatcher.register({
    readyEvent: fetchBookList,
    deleteEvent: onDelete,
    saveEvent: onSave
  });
};

module.exports = remote;

