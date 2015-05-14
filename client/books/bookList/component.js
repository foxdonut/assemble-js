var Ractive = require("ractive");
var template = require("./template.html");
var _ = require("lodash");

var init = function(ractive) {
  var findBookIndex = function(book) {
    return _.findIndex(ractive.get("books"), {id: book.id});
  };

  ractive.addOrUpdateBook = function(book) {
    var existingBookIndex = findBookIndex(book);

    if (parseInt(existingBookIndex, 10) >= 0) {
      ractive.set("books[" + existingBookIndex + "]", book);
    }
    else {
      ractive.get("books").push(book);
    }
  };

  ractive.onEdit = function(event, book) {
    event.original.preventDefault();
    return book;
  };
  ractive.onDelete = function(event, book) {
    event.original.preventDefault();
    ractive.get("books").splice(findBookIndex(book), 1);
    return book;
  };

  return ractive;
};

var Component = Ractive.extend({
  template: template,
  data: function() {
    return {
      books: []
    };
  },
  oninit: function() {
    init(this);
  }
});

module.exports = Component;
