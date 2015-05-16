var React = require("react");
var pubsub = require("./pubsub/pubsub-radio");

var bookResource = require("./books/resource");
require("./books/store")(pubsub, bookResource);

var BookManager = require("./books/bookManager/component");

React.render(
  <BookManager pubsub={pubsub}/>,
  document.getElementById("app")
);

