var _ = require("lodash");

module.exports = function() {
  return _.extend({}, {
    getInitialState: function() {
      return this.props.store.getState();
    },
    componentDidMount: function() {
      this.props.formStore.listen(this.onDataChange);
    },
    componentWillUnmount: function() {
      this.props.formStore.unlisten(this.onDataChange);
    },
    onDataChange: function(state) {
      this.setState(state);
    },
  });
};
