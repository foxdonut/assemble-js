var Rx = require("rx-lite");

var events = function() {
  return {
    editBook$: new Rx.BehaviorSubject({}),
    editingBook$: new Rx.Subject(),
    deleteBook$: new Rx.Subject(),
    saveBook$: new Rx.Subject()
  };
};

module.exports = events;
