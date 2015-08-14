var Rx = require("rx-lite");

var model = function(events, bookResource) {
  var deletedBook$ = events.deleteBook$.map(function(book) {
    return bookResource.delete(book);
  });

  var savedBook$ = events.saveBook$.map(function(book) {
    return bookResource.save(book);
  });

  var bookListQuery$ = Rx.Observable.merge(
    new Rx.BehaviorSubject({}), deletedBook$, savedBook$);

  var bookList$ = bookListQuery$.flatMap(function() {
    return bookResource.query();
  });

  var editing$ = events.editBook$.merge(events.editingBook$);

  return Rx.Observable.combineLatest(bookList$, editing$, function(bookList, editingBook) {
    return {
      bookList: bookList,
      editingBook: editingBook
    };
  });
};

module.exports = model;
