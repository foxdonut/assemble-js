var Rx = require("rx-lite");

var actions = function() {
  return {
    editBook$: new Rx.BehaviorSubject({}),
    deleteBook$: new Rx.Subject()
  };
};

module.exports = actions;
