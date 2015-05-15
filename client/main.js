var React = require("react");
var radio = require("radio");

var bookResource = require("./books/resource");
var bookStore = require("./books/store")(radio, bookResource);

//var BookManager = require("./books/bookManager/component");
var BookList = require("./books/bookList/component");

React.render(
  <div>
    <BookList bookStore={bookStore}/>
  </div>,
  document.getElementById("app")
);

bookStore.ready();

