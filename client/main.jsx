var React = require("react");

//var pubsub = require("./pubsub/pubsub-jquery");

//var dispatcher = require("./flux/pubsub/dispatcher")(pubsub);
//var storeHelper = require("./flux/pubsub/storeHelper")(pubsub);

//var dispatcher = require("./flux/fb/dispatcher")();
//var storeHelper = require("./flux/fb/storeHelper")(pubsub);

var storeHelper = require("./flux/fb/storeHelper");

var bookResource = require("./resource/resource-fetch")("/books");

//var bookActions = require("./books/bookActions")(dispatcher);
var alt = require("./flux/alt/alt");
var bookActions = require("./books/altBookActions")(alt);

//var store = require("./books/store.es6")(storeHelper, dispatcher);
//var formStore = require("./books/formStore")(storeHelper, dispatcher);
//var remote = require("./books/remote.es6")(bookResource, dispatcher);

var store = require("./books/altStore.es6")(alt, storeHelper, bookActions);
var formStore = require("./books/altFormStore")(alt, storeHelper, bookActions);
var remote = require("./books/altRemote.es6")(alt, storeHelper, bookActions, bookResource);

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

