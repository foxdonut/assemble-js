var React = require("react");
var $ = require("jquery");

module.exports = {
  setup: function(component, pubsub) {
    return function(tt, context) {
      var div = $("<div/>");
      var TestComponent = component;
      React.render(<TestComponent pubsub={pubsub}/>, div[0]);

      context.div = div;

      tt.end();
    };
  },

  cleanup: function(tt, context) {
    var div = context.div;
    div.remove();
    tt.end();
  }
};
