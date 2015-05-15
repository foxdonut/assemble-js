var BookEvents = require("./events");

var store = function(radio, bookResource) {
  var bookList = [];

  var onReady = function() {
    bookResource.query().then(function(response) {
      bookList = response.entity;
      radio(BookEvents.CHANGE).broadcast(bookList);
    });
  };

  radio(BookEvents.READY).subscribe(onReady);
};

module.exports = store;

