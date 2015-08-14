var Rx = require("rx-lite");

var model = function(actions, bookResource) {
  var deletedBook$ = actions.deleteBook$.map(function(book) {
    return bookResource.delete(book);
  });

  var savedBook$ = actions.saveBook$.map(function(book) {
    return bookResource.save(book);
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
