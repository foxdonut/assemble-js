var React = require("react");

var Component = React.createClass({
  getInitialState: function() {
    return {
      formVisible: true
    };
  },
  onEdit: function() {
    this.setState({formVisible: true});
  },
  onDelete: function() {
    this.setState({formVisible: false});
  },
  onOver: function() {
    this.setState({hoverText: "click to delete"});
  },
  onOut: function() {
    this.setState({hoverText: null});
  },
  render: function() {
    var books = this.props.books;
    var formVisible = this.state.formVisible;
    var deleteButton = formVisible ?
      <button data-action="delete" onClick={this.onDelete} onMouseOver={this.onOver} onMouseOut={this.onOut}>Delete</button>
      : null;
    var onEdit = this.onEdit;
    var state = this.state;

    return (
      <div>
        <div>Book list:</div>
        <ul>
        {
          books.map(function(book) {
            return (
              <li data-field="book" key={book.id}>
                <button data-action="edit" onClick={onEdit}>Edit</button>
                {deleteButton}
                 <span data-field="title">{book.title}</span>
                (<span data-field="author">{book.author}</span>)
                {state.hoverText}
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
