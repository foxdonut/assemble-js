var React = require("react");
var BookEvents = require("../events");

var BookForm = React.createClass({
  getInitialState: function() {
    return {
      book: {},
      editing: false
    };
  },
  componentDidMount: function() {
    console.log("this.onEdit:", this.onEdit);
    this.props.pubsub.subscribe(BookEvents.EDIT, this.onEdit);
  },
  componentWillUnmount: function() {
    this.props.pubsub.unsubscribe(BookEvents.EDIT, this.onEdit);
  },

  onEdit: function(book) {
    this.setState({editing: true, book: book});
  },

  onNew: function() {
    this.setState({editing: true});
  },

  onSave: function(event) {
    event.preventDefault();
    console.log("this.state.book:", this.state.book);
    this.props.pubsub.publish(BookEvents.SAVE, this.state.book);
    this.setState({editing: false, book: {}});
  },
  onCancel: function(event) {
    event.preventDefault();
    this.setState({editing: false, book: {}});
  },

  onChangeText: function(field) {
    var self = this;

    return function(event) {
      var book = self.state.book;
      book[field] = event.target.value;
      self.setState({book: book});
    };
  },

  render: function() {
    var book = this.state.book;

    var form = null;
    if (this.state.editing) {
      form = (
        <form onSubmit={this.onSave}>
          <div>Author:</div>
          <div><input type="text" data-field="author" value={this.state.book.author} onChange={this.onChangeText("author")}/></div>

          <div>Title:</div>
          <div><input type="text" data-field="title" value={this.state.book.title} onChange={this.onChangeText("title")}/></div>

          <div>
            <input data-action="save" type="submit" value="Save"/>
            <button data-action="cancel" onClick={this.onCancel}>Cancel</button>
          </div>
        </form>
      );
    }

    return (
      <div>
        <div>
          <button data-action="new" onClick={this.onNew}>New Book</button>
        </div>
        {form}
      </div>
    );
  }
});

module.exports = BookForm;
