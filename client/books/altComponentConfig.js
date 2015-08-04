module.exports = function(storeProperty) {
  return {
    getInitialState: function() {
      return this.props[storeProperty].getState();
    },
    componentDidMount: function() {
      this.props[storeProperty].listen(this.onDataChange);
    },
    componentWillUnmount: function() {
      this.props[storeProperty].unlisten(this.onDataChange);
    },
    onDataChange: function(state) {
      this.setState(state);
    },
  }
};

