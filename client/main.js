var React = require("react");
var radio = require("radio");

var bookResource = require("./books/resource");
require("./books/store")(radio, bookResource);

//var BookManager = require("./books/bookManager/component");
var BookList = require("./books/bookList/component");

React.render(
  <div>
    <BookList radio={radio}/>
  </div>,
  document.getElementById("app")
);

