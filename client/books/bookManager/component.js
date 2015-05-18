var Ractive = require("ractive");

var BookEvents = require("../events");
var template = require("./template.html");

var init = function(ractive, pubsub) {
  pubsub.subscribe(BookEvents.DATA, function(books) {
    ractive.set("books", books);
  });

  pubsub.publish(BookEvents.READY);

  return ractive;
};

module.exports = function(pubsub) {
  var BookFormComponent = require("../bookForm/component")(pubsub);
  var BookListComponent = require("../bookList/component")(pubsub);

  var Component = Ractive.extend({
    template: template,
    data: function() {
      return {
        books: []
      };
    },
    oninit: function() {
      init(this, pubsub);
    },
    components: {
      "book-form": BookFormComponent,
      "book-list": BookListComponent
    }
  });

  return Component;
};
