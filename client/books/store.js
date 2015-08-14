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
// - creates events that have a type and some data
// - the Dispatcher sends the events to listeners, which are Stores
//
// Component
// - calls events
// - listens to change events from Stores
// - calls getState() or other getter methods on Stores
// - calls setState() on itself to update the view.

var storeFactory = function(alt, bookActions) {
  var storeConfig = {
    state: {
      bookList: []
    },

    bindListeners: {
      onData: bookActions.data
    },

    onData: function(bookList) {
      this.setState({bookList: bookList});
    }
  };

  return alt.createStore(storeConfig, "BookStore");
};

module.exports = storeFactory;

