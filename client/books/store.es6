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

let store = (pubsub, bookResource) => {
  let bookList = [];

  let publishData = () => {
    pubsub.publish(BookEvents.DATA, bookList);
  };

  let findBookIndex = (book) => {
    return _.findIndex(bookList, {id: book.id});
  };

  let onReady = () => {
    bookResource.query().then((response) => {
      bookList = response;
      publishData();
    });
  };
  pubsub.subscribe(BookEvents.READY, onReady);

  let onDelete = (book) => {
    bookResource.delete(book).then(() => {
      let index = findBookIndex(book);

      if (index >= 0 && index < bookList.length) {
        bookList.splice(index, 1);
        publishData();
      }
    });
  };
  pubsub.subscribe(BookEvents.DELETE, onDelete);

  let onSave = (book) => {
    bookResource.save(book).then((response) => {
      let updatedBook = response;
      let index = findBookIndex(updatedBook);

      if (index >= 0) {
        bookList[index] = updatedBook;
      }
      else {
        bookList.push(updatedBook);
      }
      publishData();
    });
  };
  pubsub.subscribe(BookEvents.SAVE, onSave);
};

module.exports = store;

