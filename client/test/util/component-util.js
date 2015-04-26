var ko = require("knockout");
var $ = require("jquery");

module.exports = {
  setup: function(viewModel, template) {
    return function(tt, context) {
      var div = $("<div/>");
      div.append(template);
      ko.applyBindings(viewModel, div[0]);

      context.div = div;
      context.viewModel = viewModel;

      tt.end();
    }
  },

  cleanup: function(tt, context) {
    var div = context.div;

    ko.cleanNode(div[0]);
    div.remove();

    tt.end();
  }
};
