// Store
// - single source of truth for data
// - listens to all events from the dispatcher
// - handles events that are relevant to it
// - manages and updates data as its internal state
// - emits a single type of event: change event
// - typically listened to by components
// - provides getter methods for components to fetch data
// - could also be a single getState() function
// - therefore is coupled to the Dispatcher
// - can have multiple stores, one per app section as appropriate
// - can be coupled to other Stores, in case they need to waitFor
//
// Action Creator / Dispatcher
// - creates actions that have a type and some data
// - the Dispatcher sends the events to listeners, which are Stores
//
// Component
// - calls actions
// - listens to change events from Stores
// - calls getState() or other getter methods on Stores
// - calls setState() on itself to update the view.

let _ = require("lodash");
let BookEvents = require("./events");

let storeFactory = (storeHelper, dispatcher) => {
  let store = _.extend({}, storeHelper);

  store.state = {
    bookList: []
  };

  store.onData = (bookList) => {
    store.state.bookList = bookList;
    store.emitChange(store.state);
  };

  dispatcher.register([{ eventType: BookEvents.DATA, handler: store.onData }]);

  return store;
};

module.exports = storeFactory;

