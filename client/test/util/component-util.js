var ko = require("knockout");
var $ = require("jquery");

module.exports = {
  setup: function(component) {
    return function(tt, context) {
      var div = $("<div/>");
      div.append(component.template);
      ko.applyBindings(component.viewModel, div[0]);

      context.div = div;
      context.viewModel = component.viewModel;

      tt.end();
    };
  },

  cleanup: function(tt, context) {
    var div = context.div;

    ko.cleanNode(div[0]);
    div.remove();

    tt.end();
  }
};
