var _ = require("lodash");

var storeHelper = function(storeConfig, actions) {
  return _.extend({
    bindActions: actions,

    addChangeListener: function(callback) {
      this.listen(callback);
    },
    removeChangeListener: function(callback) {
      this.unlisten(callback);
    },
  }, storeConfig);
};

module.exports = storeHelper;
