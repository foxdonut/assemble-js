var React = require("react");

var BookItem = React.createClass({
  onEdit: function() {
    this.props.triggers.editBook(this.props.book);
  },
  onDelete: function() {
    this.props.triggers.deleteBook(this.props.book);
  },

  render: function() {
    var book = this.props.book;

    return (
      <li data-element="book">
        <button data-action="edit" onClick={this.onEdit}>Edit</button>
        <button data-action="delete" onClick={this.onDelete}>Delete</button>
         <span data-element="title">{book.title}</span><span> </span>
        (<span data-element="author">{book.author}</span>)
      </li>
    );
  }
});

var BookList = React.createClass({
  render: function() {
    var bookList = this.props.model.bookList || [];
    var props = this.props;

    return (
      <div>
        <div data-element="heading">Book list:</div>
        <ul data-element="bookList">
          {bookList.map(function(book) {
            return <BookItem key={book.id} book={book} {...props}/>;
          })}
        </ul>
      </div>
    );
  }
});

module.exports = BookList;
