let BookEvents = require("./events");

let remote = (bookResource, dispatcher) => {
  let fetchBookList = () => {
    bookResource.query().then((bookList) => {
      dispatcher.dispatch(BookEvents.DATA, bookList);
    });
  };

  let onDelete = (book) => {
    bookResource.delete(book).then(fetchBookList);
  };

  let onSave = (book) => {
    bookResource.save(book).then(fetchBookList);
  };

  dispatcher.register([
    {eventType: BookEvents.READY, handler: fetchBookList},
    {eventType: BookEvents.DELETE, handler: onDelete},
    {eventType: BookEvents.SAVE, handler: onSave}
  ]);
};

module.exports = remote;

