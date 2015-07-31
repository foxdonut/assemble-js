var React = require("react");

var pubsub = require("./pubsub/pubsub-jquery");
var dispatcher = require("./flux/pubsub/dispatcher")(pubsub);
var storeHelper = require("./flux/pubsub/storeHelper")(pubsub);

var bookResource = require("./resource/resource-fetch")("/books");
var store = require("./books/store.es6")(storeHelper, dispatcher);
var formStore = require("./books/formStore")(storeHelper, dispatcher);
var remote = require("./books/remote.es6")(bookResource, dispatcher);
var bookActions = require("./books/bookActions")(dispatcher);

var BookManager = require("./books/bookManager/component.jsx");

var props = {
  store: store,
  formStore: formStore,
  bookActions: bookActions
};

React.render(
  <BookManager {...props}/>,
  document.getElementById("app")
);

