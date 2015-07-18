var React = require("react");
var pubsub = require("./pubsub/pubsub-radio");

var bookResource = require("./resource/resource-fetch")("/books");
require("./books/store.es6")(pubsub, bookResource);

var BookManager = require("./books/bookManager/component.jsx");

React.render(
  <BookManager pubsub={pubsub}/>,
  document.getElementById("app")
);

