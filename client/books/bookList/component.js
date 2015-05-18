var Ractive = require("ractive");

var BookEvents = require("../events");
var template = require("./template.html");

var init = function(ractive, pubsub) {
  ractive.onEdit = function(event, book) {
    event.original.preventDefault();
    pubsub.publish(BookEvents.EDIT, book);
  };
  ractive.onDelete = function(event, book) {
    event.original.preventDefault();
    pubsub.publish(BookEvents.DELETE, book);
  };

  return ractive;
};

module.exports = function(pubsub) {
  var Component = Ractive.extend({
    template: template,
    data: function() {
      return {
        books: []
      };
    },
    oninit: function() {
      init(this, pubsub);
    }
  });

  return Component;
};

