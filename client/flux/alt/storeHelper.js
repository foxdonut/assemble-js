var _ = require("lodash");

var storeHelper = function(storeConfig, actions) {
  var storeObj = _.extend({
    addChangeListener: function(callback) {
      this.listen(callback);
    },
    removeChangeListener: function(callback) {
      this.unlisten(callback);
    }
  }, storeConfig);

  var StoreFactory = function() {
    _.each(storeObj, function(value, key) {
      this[key] = value;
    }, this);

    this.bindActions(actions);
  };

  return StoreFactory;
};

module.exports = storeHelper;
