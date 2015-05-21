var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

module.exports = {
  setup: function(component, pubsub, context) {
    return function() {
      var TestComponent = component;
      var testComponent = TestUtils.renderIntoDocument(
        <TestComponent pubsub={pubsub}/>
      );
      context.testComponent = testComponent;
      return testComponent;
    };
  },

  cleanup: function() {
  },

  findByAttribute: function(component, attribute, value) {
    var matches = TestUtils.findAllInRenderedTree(component, function(candidate) {
      return candidate.props[attribute] == value;
    });

    if (matches.length === 0) {
      return null;
    }
    if (matches.length === 1) {
      return matches[0];
    }
    throw "Found " + matches.length + " components matching " + attribute + " = " + value;
  }
};
