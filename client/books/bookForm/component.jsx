var React = require("react");

var BookForm = React.createClass({
  getInitialState: function() {
    return {
      editing: true
    }
  },
  onNew: function() {
// this.props.bookActions.newBook();
  },
  onSave: function(event) {
    event.preventDefault();
    this.props.actions.saveBook(this.props.model.editingBook);
  },
  onCancel: function(event) {
    event.preventDefault();
// this.props.bookActions.cancelBook();
  },

  onChangeText: function(field) {
    return (event) => {
      var book = this.props.model.editingBook;
      book[field] = event.target.value;
      this.props.actions.editingBook(book);
    };
  },

  render: function() {
    var book = this.props.model.editingBook || {};

    var form = null;

    if (this.state.editing) {
      form = (
        <form data-element="bookForm" onSubmit={this.onSave}>
          <div>Author:</div>
          <div><input type="text" data-field="author" value={book.author} onChange={this.onChangeText("author")}/></div>

          <div>Title:</div>
          <div><input type="text" data-field="title" value={book.title} onChange={this.onChangeText("title")}/></div>

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
