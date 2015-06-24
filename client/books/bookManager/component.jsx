var React = require("react");
var BookEvents = require("../events");
var BookForm = require("../bookForm/component.jsx");
var BookList = require("../bookList/component.jsx");
var RadioGroup = require("../radioGroup/component.jsx");

var BookManager = React.createClass({
  componentDidMount: function() {
    this.props.pubsub.publish(BookEvents.READY);
  },
  render: function() {
    return (
      <div>
        <BookForm pubsub={this.props.pubsub}/>
        <RadioGroup/>
        <BookList pubsub={this.props.pubsub}/>
      </div>
    );
  }
});

module.exports = BookManager;

