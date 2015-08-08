var React = require("react");
var BookForm = require("../bookForm/component.jsx");
var BookList = require("../bookList/component.jsx");

var BookManager = React.createClass({
  componentDidMount: function() {
    this.props.bookActions.initialize();
  },
  render: function() {
    return (
      <div>
        <BookForm {...this.props}/>
        <BookList {...this.props}/>
      </div>
    );
  }
});

module.exports = BookManager;

