/*
var bookManagerComponent = require("./books/bookManager/component")();

var componentRegistry = require("./component/registry");
componentRegistry.register("book-manager", bookManagerComponent);

var ko = require("knockout");
ko.applyBindings({ viewModel: bookManagerComponent.viewModel });
*/

var BookListComponent = require("./books/bookList/component");
var bookListComponent = BookListComponent.create({el: "#bookList"});
bookListComponent.setBooks([
  {author:"Daoud", title:"Stripes"},
  {author:"Moffitt, Daoud", title:"7 Web Frameworks"}
]);
