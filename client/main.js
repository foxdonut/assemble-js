var wire = require("wire");
var ko = require("knockout");

var componentRegistry = require("./component/registry");
componentRegistry.register("book-manager", require("./books/bookManager/template.html"));

var wireSpec = require("./books/bookManager/wireSpec");
wire(wireSpec);
ko.applyBindings({ viewModel: wireSpec.viewModel });

