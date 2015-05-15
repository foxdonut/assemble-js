var React = require("react");
var BookList = require("../bookList/component");

var BookManager = React.createClass({
  render: function() {
    return (
      <BookList radio={this.props.radio}/>
    );
  }
});

module.exports = BookManager;

