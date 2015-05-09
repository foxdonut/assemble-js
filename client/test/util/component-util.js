var _ = require("lodash");
var $ = require("jquery");

module.exports = {
  setup: function(componentFn, viewModel) {
    return function(tt, context) {
      var div = $("<div/>");
      var component = componentFn(_.extend({el: div}, viewModel));

      context.div = div;
      context.component = component;

      tt.end();
    };
  },

  cleanup: function(tt, context) {
    var div = context.div;

    div.remove();

    tt.end();
  }
};
