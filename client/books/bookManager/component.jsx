var React = require("react");
var BookEvents = require("../events");
var BookForm = require("../bookForm/component.jsx");
var BookList = require("../bookList/component.jsx");
var RadioGroup = require("../radioGroup/component.jsx");

var BookManager = React.createClass({
  componentDidMount: function() {
    this.props.bookActions.initialize();
  },
  render: function() {
    return (
      <div>
        <BookForm {...this.props}/>
        {/*<RadioGroup/>*/}
        <BookList {...this.props}/>
      </div>
    );
  }
});

module.exports = BookManager;

