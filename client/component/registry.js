var Ractive = require("ractive");

module.exports = {
  register: function(componentName, Component) {
    Ractive.components[componentName] = Component;
  }
};
