var _ = require("lodash");

var storeFactory = function(alt, storeHelper, bookActions) {
  var storeConfig = {
    state: {
      book: {},
      editing: false
    }
  };

  var Store = storeHelper(storeConfig, bookActions);

  Store.prototype.onNewBook = function() {
    this.setState({book: {}, editing: true});
  };

  Store.prototype.onEditBook = function(book) {
    this.setState({book: _.extend({}, book), editing: true});
  };

  Store.prototype.onSaveBook = function() {
    this.setState({book: {}, editing: false});
  };

  Store.prototype.onCancelBook = function() {
    this.setState({book: {}, editing: false});
  };

  return alt.createStore(Store, "FormStore");
};

module.exports = storeFactory;

