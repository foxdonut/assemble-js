var React = require("react/addons");
var TestUtils = React.addons.TestUtils;
var testdom = require("./testdom");

module.exports = {
  setup: function(component, props, context) {
    return function() {
      testdom.clearDocument();
      var TestComponent = component;
      var testComponent = TestUtils.renderIntoDocument(
        <TestComponent {...props}/>
      );
      context.testComponent = testComponent;
      return testComponent;
    };
  },

  findAllByAttribute: function(component, attribute, value) {
    return TestUtils.findAllInRenderedTree(component, function(candidate) {
      return candidate.props[attribute] == value;
    });
  },

  findByAttribute: function(component, attribute, value) {
    var matches = this.findAllByAttribute(component, attribute, value);

    if (matches.length === 0) {
      return null;
    }
    return matches[0];
  }
};
