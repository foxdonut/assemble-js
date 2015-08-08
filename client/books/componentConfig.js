module.exports = function(storeProperty) {
  return {
    getInitialState: function() {
      return this.props[storeProperty].getState();
    },
    componentDidMount: function() {
      this.props[storeProperty].addChangeListener(this.onDataChange);
    },
    componentWillUnmount: function() {
      this.props[storeProperty].removeChangeListener(this.onDataChange);
    },
    onDataChange: function(state) {
      this.setState(state);
    }
  };
};

