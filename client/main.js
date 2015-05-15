var Ractive = require("ractive");
var radio = require("radio");

var bookResource = require("./books/resource");
require("./books/store")(radio, bookResource);

var BookManagerComponent = require("./books/bookManager/component")(radio);
var template = require("./template.html");

new Ractive({
  el: "#app",
  append: true,
  template: template,
  components: {
    "book-manager": BookManagerComponent
  }
});

