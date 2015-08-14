var Rx = require("rx-lite");

var events = function() {
  return {
    editBook$: new Rx.BehaviorSubject({}),
    deleteBook$: new Rx.Subject(),
    saveBook$: new Rx.Subject()
  };
};

module.exports = events;
