var BookConstants = require("./constants");

var store = function(radio, bookResource) {
  var bookList = [];

  return {
    addChangeListener: function(callback) {
      radio(BookConstants.CHANGE_EVENT).subscribe(callback);
    },
    removeChangeListener: function(callback) {
      radio(BookConstants.CHANGE_EVENT).unsubscribe(callback);
    },
    ready: function() {
      bookResource.query().then(function(response) {
        bookList = response.entity;
        radio(BookConstants.CHANGE_EVENT).broadcast(bookList);
      });
    }
  };
};

module.exports = store;

