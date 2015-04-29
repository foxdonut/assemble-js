var viewModel = require("./viewModel");
var template = require("./template.html");

var componentRegistry = require("../../component/registry");
var wire = require("wire");
var wireSpec = require("./wireSpec");

var bookFormComponent = require("../bookForm/component")();
var bookListComponent = require("../bookList/component")();

var component = function() {
  var vm = viewModel(bookFormComponent.viewModel, bookListComponent.viewModel);

  wire(wireSpec(vm));

  componentRegistry.register("book-form", bookFormComponent);
  componentRegistry.register("book-list", bookListComponent);

  return {
    viewModel: vm,
    template: template
  };
};

module.exports = component;

