var Ractive = require("ractive");
var radio = require("radio");

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

var bookResource = require("./books/resource");

bookResource.query().then(function(response) {
  var books = response.entity;
  radio("EVT_BOOKS_AVAILABLE").broadcast(books);
});

