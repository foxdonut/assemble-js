var createComponent = require("../../component/create");
var template = require("./template.html");

var wire = require("wire");
var wireSpec = require("./wireSpec");

var bookFormComponent = require("../bookForm/component")({el: ".bookForm"});
var bookListComponent = require("../bookList/component")({el: ".bookList"});

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

module.exports = createComponent(viewModel, template);

