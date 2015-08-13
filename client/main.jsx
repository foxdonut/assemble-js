var React = require("react");

var bookResource = require("./resource/resource-fetch")("/books");

var actions = require("./books/actions")();
var triggers = require("./books/triggers")(actions);
var model = require("./books/model")(actions, bookResource);

var BookManager = require("./books/bookManager/component.jsx");

var view = function(model$) {
  return model$.map(function(model) {
    return <BookManager model={model} triggers={triggers}/>;
  });
};

var renderView = function(view) {
  React.render(view, document.getElementById("app"));
};

view(model).subscribe(renderView);

