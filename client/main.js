var Ractive = require("ractive");
var BookManagerComponent = require("./books/bookManager/component");
var template = require("./template.html");

new Ractive({
  el: "#app",
  append: true,
  template: template,
  components: {
    "book-manager": BookManagerComponent
  }
});
