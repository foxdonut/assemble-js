var React = require("react");
var BookEvents = require("../events");
var BookForm = require("../bookForm/component");
var BookList = require("../bookList/component");

var BookManager = React.createClass({
  componentDidMount: function() {
    this.props.pubsub.publish(BookEvents.READY);
  },
  render: function() {
    return (
      <div>
        <BookForm pubsub={this.props.pubsub}/>
        <BookList pubsub={this.props.pubsub}/>
      </div>
    );
  }
});

module.exports = BookManager;

