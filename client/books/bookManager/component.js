var React = require("react");
var BookEvents = require("../events");
var BookForm = require("../bookForm/component");
var BookList = require("../bookList/component");

var BookManager = React.createClass({
  componentDidMount: function() {
    this.props.radio(BookEvents.READY).broadcast();
  },
  render: function() {
    return (
      <div>
        <BookForm radio={this.props.radio}/>
        <BookList radio={this.props.radio}/>
      </div>
    );
  }
});

module.exports = BookManager;

