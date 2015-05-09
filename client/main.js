var Ractive = require("ractive");
var BookManagerComponent = require("./books/bookManager/component");

new Ractive({
  el: "#app",
  append: true,
  template: "<book-manager></book-manager>",
  components: {
    "book-manager": BookManagerComponent
  }
});
