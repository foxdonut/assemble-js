var React = require("react");

var Component = React.createClass({
  render: function() {
    var books = this.state.books;
    return (
      <div>Book list:</div>
      <ul>
      {
        books.map(function(book) {
          <li data-field="book" key={book.id}>
            <button data-action="edit" data-bind="click: $parent.onEdit">Edit</button>
            <button data-action="delete" data-bind="click: $parent.onDelete">Delete</button>
             <span data-field="title" data-bind="text: title"></span>
            (<span data-field="author" data-bind="text: author"></span>)
          </li>
        })
      }
      </ul>
    );
  }
});

module.exports = Component;
