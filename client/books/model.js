var Rx = require("rx-lite");

var model = function(actions, bookResource) {
  var refresh$ = actions.deleteBook$.map(function(book) {
    return bookResource.delete(book);
  });

  var bookListQuery$ = new Rx.BehaviorSubject({}).merge(refresh$);

  var bookList$ = bookListQuery$.flatMap(function() {
    return bookResource.query();
  });

  return bookList$.map(function(bookList) {
    return {
      bookList: bookList
    };
  });
};

module.exports = model;

