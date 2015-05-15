var React = require("react");
var BookEvents = require("../events");

var BookList = React.createClass({
  getInitialState: function() {
    return {
      bookList: []
    };
  },
  componentDidMount: function() {
    this.props.radio(BookEvents.CHANGE).subscribe(this.onChange);
    this.props.radio(BookEvents.READY).broadcast();
  },
  componentWillUnmount: function() {
    this.props.radio(BookEvents.CHANGE).unsubscribe(this.onChange);
  },

  onChange: function(bookList) {
    this.setState({bookList: bookList});
  },

  onDelete: function(bookId) {
    var radio = this.props.radio;

    return function() {
      radio(BookEvents.DELETE).broadcast(bookId);
    };
  },

  render: function() {
    var bookList = this.state.bookList;
    var onDelete = this.onDelete;

    return (
      <div>
        <div>Book list:</div>
        <ul>
        {
          bookList.map(function(book) {
            return (
              <li data-field="book" key={book.id}>
                <button data-action="edit">Edit</button>
                <button data-action="delete" onClick={onDelete(book.id)}>Delete</button>
                 <span data-field="title">{book.title}</span>
                (<span data-field="author">{book.author}</span>)
              </li>
            );
          })
        }
        </ul>
      </div>
    );
  }
});

module.exports = BookList;
