var React = require("react");

var BookItem = React.createClass({
  onEdit: function() {
    this.props.bookActions.editBook(this.props.book);
  },
  onDelete: function() {
    this.props.bookActions.deleteBook(this.props.book);
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
  getInitialState: function() {
/*
    return {
      bookList: []
    };
*/
    return this.props.store.getState();
  },
  componentDidMount: function() {
//this.props.store.addChangeListener(this.onDataChange);
    this.props.store.listen(this.onDataChange);
  },
  componentWillUnmount: function() {
//this.props.store.removeChangeListener(this.onDataChange);
    this.props.store.unlisten(this.onDataChange);
  },
  onDataChange: function(state) {
    this.setState(state);
  },

  render: function() {
    var bookList = this.state.bookList;
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
