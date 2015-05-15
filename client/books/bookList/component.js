var React = require("react");
var BookEvents = require("../events");

var BookItem = React.createClass({
  onDelete: function() {
    this.props.radio(BookEvents.DELETE).broadcast(this.props.book);
  },

  render: function() {
    var book = this.props.book;

    return (
      <li data-field="book" key={book.id}>
        <button data-action="edit">Edit</button>
        <button data-action="delete" onClick={this.onDelete}>Delete</button>
         <span data-field="title">{book.title}</span>
        (<span data-field="author">{book.author}</span>)
      </li>
    );
  }
});

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

  render: function() {
    var radio = this.props.radio;
    var bookList = this.state.bookList;

    return (
      <div>
        <div>Book list:</div>
        <ul>
        {
          bookList.map(function(book) {
            return <BookItem key={book.id} radio={radio} book={book}/>;
          })
        }
        </ul>
      </div>
    );
  }
});

module.exports = BookList;
