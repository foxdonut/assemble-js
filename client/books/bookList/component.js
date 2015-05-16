var Ractive = require("ractive");

var BookEvents = require("../events");
var template = require("./template.html");

var init = function(ractive, radio) {
  ractive.onEdit = function(event, book) {
    event.original.preventDefault();
    radio(BookEvents.EDIT).broadcast(book);
  };
  ractive.onDelete = function(event, book) {
    event.original.preventDefault();
    radio(BookEvents.DELETE).broadcast(book);
  };

  return ractive;
};

module.exports = function(radio) {
  var Component = Ractive.extend({
    template: template,
    data: function() {
      return {
        books: []
      };
    },
    oninit: function() {
      init(this, radio);
    }
  });

  return Component;
};

