var React = require("react");
var BookEvents = require("../events");

var BookItem = React.createClass({
  onEdit: function() {
    this.props.pubsub.publish(BookEvents.EDIT, this.props.book);
  },
  onDelete: function() {
    this.props.pubsub.publish(BookEvents.DELETE, this.props.book);
  },

  render: function() {
    var book = this.props.book;

    return (
      <li data-field="book" key={book.id}>
        <button data-action="edit" onClick={this.onEdit}>Edit</button>
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
    console.log("this.onChange:", this.onDataChange);
    this.props.pubsub.subscribe(BookEvents.DATA, this.onDataChange);
  },
  componentWillUnmount: function() {
    this.props.pubsub.unsubscribe(BookEvents.DATA, this.onDataChange);
  },

  onDataChange: function(bookList) {
    console.log("received:", bookList);
    this.setState({bookList: bookList});
  },

  render: function() {
    var pubsub = this.props.pubsub;
    var bookList = this.state.bookList;

    return (
      <div>
        <div>Book list:</div>
        <ul>
        {
          bookList.map(function(book) {
            return <BookItem key={book.id} pubsub={pubsub} book={book}/>;
          })
        }
        </ul>
      </div>
    );
  }
});

module.exports = BookList;
