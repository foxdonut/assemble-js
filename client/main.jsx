var React = require("react");

var bookResource = require("./resource/resource-fetch")("/books");

var alt = require("./flux/alt/alt");
var bookActions = require("./books/bookActions")(alt);

var store = require("./books/store")(alt, bookActions);
var formStore = require("./books/formStore")(alt, bookActions);
var remote = require("./books/remote")(alt, bookActions, bookResource);

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

