var Ractive = require("ractive");
var _ = require("lodash");

var createComponent = function(viewModel, template) {

  var Component = Ractive.extend({
    template: template
  });

  var create = function(extendedViewModel) {
    var mergedViewModel = _.extend({}, viewModel, (extendedViewModel || {}));
    return new Component(mergedViewModel);
  };

  return create;
};

module.exports = createComponent;