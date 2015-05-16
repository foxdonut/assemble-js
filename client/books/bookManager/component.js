var Ractive = require("ractive");

var BookEvents = require("../events");
var template = require("./template.html");

var init = function(ractive, radio) {
  radio(BookEvents.CHANGE).subscribe(function(books) {
    ractive.set("books", books);
  });

  radio(BookEvents.READY).broadcast();

  return ractive;
};

module.exports = function(radio) {
  var BookFormComponent = require("../bookForm/component")(radio);
  var BookListComponent = require("../bookList/component")(radio);

  var Component = Ractive.extend({
    template: template,
    data: function() {
      return {
        books: []
      };
    },
    oninit: function() {
      init(this, radio);
    },
    components: {
      "book-form": BookFormComponent,
      "book-list": BookListComponent
    }
  });

  return Component;
};
