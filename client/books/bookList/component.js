var Ractive = require("ractive");
var template = require("./template.html");

var Component = Ractive.extend({
  template: template,
  magic: true
});

var _ = require("lodash");
var viewModel = require("./viewModel");

var create = function(extendedViewModel) {
  var mergedViewModel = _.extend({}, viewModel(), (extendedViewModel || {}));
  var component = new Component(mergedViewModel);
  /*
  _.each(mergedViewModel.events, function(handler, event) {
    component.on(event, handler);
  });
  */
  return component;
};

module.exports = {
  Component: Component,
  create: create
};

