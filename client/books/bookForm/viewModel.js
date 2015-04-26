var ko = require("knockout");
require("knockout-mapping");

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
    author: ko.observable(),
    title: ko.observable()
  };

  obj.editBook = function(book) {
    ko.mapping.fromJS(book, {}, obj.book);
    obj.showForm();
  };

  obj.clearForm = function() {
    ko.mapping.fromJS({author: "", title: ""}, {}, obj.book);
  };

  return obj;
};

module.exports = viewModel;
