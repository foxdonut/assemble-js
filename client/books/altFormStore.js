var _ = require("lodash");

var storeFactory = function(alt, bookActions) {
  var storeConfig = {
    state: {
      book: {},
      editing: false
    },
    bindListeners: {
      onNewBook: bookActions.newBook,
      onEditBook: bookActions.editBook,
      onSaveBook: bookActions.saveBook,
      onCancelBook: bookActions.cancelBook
    },
    onNewBook: function() {
      this.setState({book: {}, editing: true});
    },
    onEditBook: function(book) {
      this.setState({book: _.extend({}, book), editing: true});
    },
    onSaveBook: function() {
      this.setState({book: {}, editing: false});
    },
    onCancelBook: function() {
      this.setState({book: {}, editing: false});
    }
  };

  return alt.createStore(storeConfig, "FormStore");
};

module.exports = storeFactory;

