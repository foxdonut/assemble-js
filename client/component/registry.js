var ko = require("knockout");

module.exports = {
  register: function(componentName, component) {
    ko.components.register(componentName, component);
  }
};
