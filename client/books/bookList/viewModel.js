var _ = require("lodash");

module.exports = function(params) {
  _.extend(this, params.viewModel);
};
