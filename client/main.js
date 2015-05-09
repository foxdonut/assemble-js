var Ractive = require("ractive");
var BookManagerComponent = require("./books/bookManager/component");

new Ractive({
  el: "body",
  append: true,
  components: {
    "book-manager": BookManagerComponent
  }
});
