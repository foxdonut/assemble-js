var Rx = require("rx-lite");

var model = function(actions, bookResource) {
  var refresh$ = actions.deleteBook$.map(function(book) {
    return bookResource.delete(book);
  });

  var bookListQuery$ = new Rx.BehaviorSubject({}).merge(refresh$);

  var bookList$ = bookListQuery$.flatMap(function() {
    return bookResource.query();
  });

  return Rx.Observable.combineLatest(bookList$, actions.editBook$, function(bookList, editBook) {
    return {
      bookList: bookList,
      editBook: editBook
    };
  });
};

module.exports = model;

