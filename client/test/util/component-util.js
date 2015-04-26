module.exports = {
  setup: function(ViewModel) {
    return function(tt, context) {
      var div = $("<div/>");
      div.append(template);
      var viewModel = new ViewModel();
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
