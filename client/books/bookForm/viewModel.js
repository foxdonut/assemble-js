var viewModel = function() {

  var obj = {
    data: {
      formVisible: "none",
      book: null
    }
  };

  obj.onNew = function() {
    obj.showForm();
  };

  obj.onSave = function(event, book) {
    event.original.preventDefault();
    return book;
  };

  obj.onCancel = function() {
    obj.clearForm();
    obj.hideForm();
  };

  obj.showForm = function() {
    obj.data.formVisible = "";
  };
  obj.hideForm = function() {
    obj.data.formVisible = "none";
  };

  obj.editBook = function(book) {
    obj.data.book = book;
    obj.showForm();
  };

  obj.clearForm = function() {
    obj.data.book = null;
  };

  return obj;
};

module.exports = viewModel;
