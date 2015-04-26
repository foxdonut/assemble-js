var ko = require("knockout");

var viewModel = function() {

  var obj = {};

  obj.onNew = function() {
    obj.showForm();
  };

  obj.onSave = function() {
    return ko.toJS(obj.book);
  };

  obj.onCancel = function() {
    obj.clearForm();
    obj.hideForm();
  };

  obj.formVisible = ko.observable(false);
  obj.showForm = function() {
    obj.formVisible(true);
  };
  obj.hideForm = function() {
    obj.formVisible(false);
  };

  obj.book = {
    id: null,
    author: ko.observable(),
    title: ko.observable()
  };

  obj.editBook = function(book) {
    obj.book.id = book.id;
    obj.book.author(book.author());
    obj.book.title(book.title());
    obj.showForm();
  };

  obj.clearForm = function() {
    obj.book.id = null;
    obj.book.author("");
    obj.book.title("");
  };

  return obj;
};

module.exports = viewModel;
