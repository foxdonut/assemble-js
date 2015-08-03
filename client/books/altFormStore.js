var _ = require("lodash");

var storeFactory = function(alt, storeHelper, bookActions) {
  var storeConfig = {
    state: {
      book: {},
      editing: false
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

  var store = alt.createStore(storeHelper(storeConfig, bookActions), "FormStore");

  return store;
};

module.exports = storeFactory;

