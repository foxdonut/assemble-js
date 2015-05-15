var React = require("react");

var BookList = React.createClass({
  getInitialState: function() {
    return {
      bookList: []
    };
  },
  componentDidMount: function() {
    this.props.bookStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function() {
    this.props.bookStore.removeChangeListener(this.onChange);
  },
  onChange: function(bookList) {
    this.setState({bookList: bookList});
  },

  render: function() {
    var bookList = this.state.bookList;

    return (
      <div>
        <div>Book list:</div>
        <ul>
        {
          bookList.map(function(book) {
            return (
              <li data-field="book" key={book.id}>
                <button data-action="edit">Edit</button>
                <button data-action="delete">Delete</button>
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
