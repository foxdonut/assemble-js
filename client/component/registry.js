var ko = require("knockout");

module.exports = {
  register: function(componentName, componentModule) {
    console.log("register:", componentName);
    ko.components.register(componentName, componentModule);
  }
};