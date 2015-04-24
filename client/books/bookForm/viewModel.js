var ko = require("knockout");
require("knockout-mapping");

var ViewModel = function() {

  var self = this;

  self.onNew = function() {
    self.showForm();
  };

  self.onSave = function() {
  };

  self.onCancel = function() {
  };

  self.formVisible = ko.observable(false);
  self.showForm = function() {
    self.formVisible(true);
  };
  self.hideForm = function() {
    self.formVisible(false);
  };

  self.book = {
    author: ko.observable(),
    title: ko.observable()
  };

  self.getBook = function() {
    return ko.toJS(self.book);
  };

  self.editBook = function(book) {
    self.showForm();
    ko.mapping.fromJS(book, {}, self.book);
  };

  self.clear = function() {
    ko.mapping.fromJS({author: "", title: ""}, {}, self.book);
  };
};

module.exports = ViewModel;
