var Ractive = require("ractive");
var radio = require("radio");

var template = require("./template.html");

var BookFormComponent = require("../bookForm/component");
var BookListComponent = require("../bookList/component");

var init = function(ractive) {
  radio("EVT_BOOKS_AVAILABLE").subscribe(function(books) {
    ractive.set("books", books);
  });

  return ractive;
};

var Component = Ractive.extend({
  template: template,
  data: function() {
    return {
      books: [],
    }
  },
  oninit: function() {
    init(this);
  },
  components: {
    "book-form": BookFormComponent,
    "book-list": BookListComponent
  }
});

module.exports = Component;
