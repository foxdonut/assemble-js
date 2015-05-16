var Ractive = require("ractive");

var BookEvents = require("../events");
var template = require("./template.html");

var init = function(ractive, radio) {
  ractive.onNew = function(event) {
    event.original.preventDefault();
    ractive.showForm();
  };

  ractive.onSave = function(event, book) {
    event.original.preventDefault();
    radio(BookEvents.SAVE).broadcast(book);
    ractive.hideForm();
  };

  ractive.onCancel = function(event) {
    event.original.preventDefault();
    ractive.hideForm();
  };

  ractive.showForm = function() {
    ractive.set("formVisible", "");
  };
  ractive.hideForm = function() {
    ractive.set("formVisible", "none");
    ractive.set("book", {});
  };

  var onEdit = function(book) {
    ractive.set("book", book);
    ractive.showForm();
  };
  radio(BookEvents.EDIT).subscribe(onEdit);

  return ractive;
};

module.exports = function(radio) {
  var Component = Ractive.extend({
    template: template,
    data: function() {
      return {
        formVisible: "none",
        book: {}
      };
    },
    oninit: function() {
      init(this, radio);
    }
  });

  return Component;
};
