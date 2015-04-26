var ko = require("knockout");
require("knockout-mapping");

var viewModel = function() {

  var obj = {};

  obj.onNew = function() {
    obj.showForm();
  };

  obj.onSave = function() {
  };

  obj.onCancel = function() {
    obj.clear();
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
    author: ko.observable(),
    title: ko.observable()
  };

  obj.getBook = function() {
    return ko.toJS(obj.book);
  };

  obj.editBook = function(book) {
    obj.showForm();
    ko.mapping.fromJS(book, {}, obj.book);
  };

  obj.clear = function() {
    ko.mapping.fromJS({author: "", title: ""}, {}, obj.book);
  };

  return obj;
};

module.exports = viewModel;
