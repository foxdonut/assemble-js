var createComponent = require("../../component/create");
var template = require("./template.html");

var init = function(ractive) {
  ractive.onNew = function(event) {
    event.original.preventDefault();
    ractive.showForm();
  };

  ractive.onSave = function(event, book) {
    event.original.preventDefault();
    return book;
  };

  ractive.onCancel = function(event) {
    event.original.preventDefault();
    ractive.clearForm();
    ractive.hideForm();
  };

  ractive.showForm = function() {
    ractive.set("formVisible", "");
  };
  ractive.hideForm = function() {
    ractive.set("formVisible", "none");
  };

  ractive.editBook = function(book) {
    ractive.set("book", book);
    ractive.showForm();
  };

  ractive.clearForm = function() {
    ractive.set("book", null);
  };

  return ractive;
};

var viewModel = {
  data: {
    formVisible: "none",
    book: null
  },
  oninit: function() {
    init(this);
  }
};

module.exports = createComponent(viewModel, template);
