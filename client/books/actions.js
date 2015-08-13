var Rx = require("rx-lite");

var actions = function() {
  return {
    deleteBook$: new Rx.Subject()
  };
};

module.exports = actions;
