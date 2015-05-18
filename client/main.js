var Ractive = require("ractive");
//var pubsub = require("./pubsub/pubsub-radio");
var pubsub = require("./pubsub/pubsub-jquery");

//var bookResource = require("./resource/resource-rest")("/books");
var bookResource = require("./resource/resource-jquery")("/books");
require("./books/store")(pubsub, bookResource);

var BookManagerComponent = require("./books/bookManager/component")(pubsub);
var template = require("./template.html");

new Ractive({
  el: "#app",
  append: true,
  template: template,
  components: {
    "book-manager": BookManagerComponent
  }
});

