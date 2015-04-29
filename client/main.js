var bookManagerComponent = require("./books/bookManager/component")();

var componentRegistry = require("./component/registry");
componentRegistry.register("book-manager", bookManagerComponent);

var ko = require("knockout");
ko.applyBindings({ viewModel: bookManagerComponent.viewModel });

