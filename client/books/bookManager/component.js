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

  wire(wireSpec(ractive));

  return ractive;
};

var Component = Ractive.extend({
  template: template,
  oninit: function() {
    init(this);
  },
  components: {
    "book-form": BookFormComponent,
    "book-list": BookListComponent
  }
});

module.exports = Component;

