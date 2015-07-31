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
    this.props.formStore.addChangeListener(this.onDataChange);
  },
  componentWillUnmount: function() {
    this.props.formStore.removeChangeListener(this.onDataChange);
  },
  onDataChange: function(state) {
    this.setState(state);
  },

  onNew: function() {
    this.props.bookActions.newBook();
  },

  onSave: function(event) {
    event.preventDefault();
    this.props.bookActions.saveBook(this.state.book);
  },
  onCancel: function(event) {
    event.preventDefault();
    this.props.bookActions.cancelBook();
  },

  onChangeText: function(field) {
    return (event) => {
      var book = this.state.book;
      book[field] = event.target.value;
      this.props.bookActions.editBook(book);
    };
  },

  render: function() {
    var book = this.state.book;

    var form = null;
    if (this.state.editing) {
      form = (
        <form data-element="bookForm" onSubmit={this.onSave}>
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
