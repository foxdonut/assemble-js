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
    this.props.radio(BookEvents.EDIT).subscribe(this.onEdit);
  },
  componentWillUnmount: function() {
    this.props.radio(BookEvents.EDIT).unsubscribe(this.onEdit);
  },

  onEdit: function(book) {
    this.setState({editing: true, book: book});
  },

  onNew: function() {
    this.setState({editing: true});
  },

  onSave: function() {
    this.props.radio(BookEvents.SAVE).broadcast(this.state.book);
    this.setState({editing: false, book: {}});
  },
  onCancel: function() {
    this.setState({editing: false, book: {}});
  },

  onChange: function(field) {
    var self = this;

    return function(event) {
      var book = self.state.book;
      book[field] = event.target.value;
      self.setState({book: book});
    };
  },

  render: function() {
    var radio = this.props.radio;
    var book = this.state.book;

    var form = null;
    if (this.state.editing) {
      form = (
        <form onSubmit={this.onSave}>
          <div>Author:</div>
          <div><input type="text" data-field="author" value={this.state.book.author} onChange={this.onChange("author")}/></div>

          <div>Title:</div>
          <div><input type="text" data-field="title" value={this.state.book.title} onChange={this.onChange("title")}/></div>

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
