var Rx = require("rx-lite");

var model = function(actions, bookResource) {
  var bookList$ = new Rx.BehaviorSubject({}).flatMap(function() {
    return bookResource.query();
  });

  return bookList$.map(function(bookList) {
    return {
      bookList: bookList
    };
  });
};

module.exports = model;

