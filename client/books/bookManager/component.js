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
  };

var Component = Ractive.extend({
  template: template,
  append: true,
  oninit: function() {
    init(this);
  },
  components: {
    "book-form": BookFormComponent,
    "book-list": BookListComponent
  }
});

var create = function(params) {
  var component = new Component(params);
  wire(wireSpec(component))
  return component;
};

module.exports = create;
