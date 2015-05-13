var React = require("react");

var Component = React.createClass({
  render: function() {
    var books = this.props.books;

    return (
      <div>
        <div>Book list:</div>
        <ul>
        {
          books.map(function(book) {
            return (
              <li data-field="book" key={book.id}>
                <button data-action="edit" data-bind="click: $parent.onEdit">Edit</button>
                <button data-action="delete" data-bind="click: $parent.onDelete">Delete</button>
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

module.exports = Component;
