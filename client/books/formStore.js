var _ = require("lodash");
var BookEvents = require("./events");

var formStoreFactory = function(storeHelper, dispatcher) {
  var store = _.extend({}, storeHelper);

  store.state = {
    book: {},
    editing: false
  };

  store.onNewBook = function() {
    store.state.book = {};
    store.state.editing = true;
    store.emitChange(store.state);
  };

  store.onEditBook = function(book) {
    store.state.book = _.extend({}, book);
    store.state.editing = true;
    store.emitChange(store.state);
  };

  store.onSaveBook = function() {
    store.state.book = {};
    store.state.editing = false;
    store.emitChange(store.state);
  };

  store.onCancelBook = function() {
    store.state.book = {};
    store.state.editing = false;
    store.emitChange(store.state);
  }

  dispatcher.register([
    { eventType: BookEvents.NEW, handler: store.onNewBook },
    { eventType: BookEvents.EDIT, handler: store.onEditBook },
    { eventType: BookEvents.SAVE, handler: store.onSaveBook },
    { eventType: BookEvents.CANCEL, handler: store.onCancelBook }
  ]);

  return store;
};

module.exports = formStoreFactory;
