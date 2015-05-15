var React = require("react");
var radio = require("radio");

var bookResource = require("./books/resource");
require("./books/store")(radio, bookResource);

var BookManager = require("./books/bookManager/component");

React.render(
  <BookManager radio={radio}/>,
  document.getElementById("app")
);

