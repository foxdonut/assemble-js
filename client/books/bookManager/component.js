var Ractive = require("ractive");
var template = require("./template.html");

var BookFormComponent = require("../bookForm/component");
var BookListComponent = require("../bookList/component");

var wire = require("wire");
var wireSpec = require("./wireSpec");

var init = function(ractive) {
  ractive.setBooks = function(books) {
    ractive.set("books", books);
  };

  return ractive;
};

var complete = function(ractive) {
  wire(wireSpec(ractive));
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
  oncomplete: function() {
    complete(this);
  },
  components: {
    "book-form": BookFormComponent,
    "book-list": BookListComponent
  }
});

module.exports = Component;
