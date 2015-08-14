var React = require("react");
var _ = require("lodash");

var BookForm = React.createClass({
  onNew: function() {
    this.props.actions.editingBook({book:{}, editing:true});
  },
  onSave: function(event) {
    event.preventDefault();
    this.props.actions.saveBook(this.props.model.editingBook.book);
    this.props.actions.editingBook({editing:false});
  },
  onCancel: function(event) {
    event.preventDefault();
    this.props.actions.editingBook({editing:false});
  },

  onChangeText: function(field) {
    return (event) => {
      var book = this.props.model.editingBook.book;
      book[field] = event.target.value;
      this.props.actions.editingBook({book:book, editing:true});
    };
  },

  render: function() {
    var book = this.props.model.editingBook.book || {};

    var form = null;

    if (this.props.model.editingBook.editing) {
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
