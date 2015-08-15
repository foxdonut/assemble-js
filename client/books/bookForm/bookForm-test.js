require("../../test/testdom")();

var expect = require("chai").expect;
var sinon = require("sinon");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var _ = require("lodash");

var componentTestUtils = require("../../test/component-test-utils");

var BookForm = require("./component.jsx");

var book = { author: "Test1", title: "One" };

describe("BookForm component", function() {
  var context = {};

  describe("initial", function() {
    var props = {
      model: {
        editingBook: {
        }
      }
    };

    beforeEach(componentTestUtils.setup(BookForm, props, context));
    afterEach(componentTestUtils.cleanup);

    it("renders a New button", function() {
      var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
      expect(newButton).to.exist;
    });

    it("does not render the form", function() {
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).not.to.exist;
    });
  });

  describe("new book button", function() {
    var props = {
      model: {
        editingBook: {
          editing: false
        }
      }
    };

    props.actions = {
      editingBook: function(value) {
        props.model.editingBook = value;
        context.testComponent.forceUpdate();
      }
    };

    beforeEach(componentTestUtils.setup(BookForm, props, context));
    afterEach(componentTestUtils.cleanup);

    it("renders the form in editing mode", function() {
      var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
      TestUtils.Simulate.click(newButton);
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).to.exist;
    });
  });

  describe("book functions", function() {
    var props = {
      model: {
        editingBook: {
          editing: true,
          book: book
        }
      }
    };

    props.actions = {
      saveBook: sinon.spy(),
      editingBook: function(value) {
        props.model.editingBook = value;
        context.testComponent.forceUpdate();
      }
    };

    beforeEach(componentTestUtils.setup(BookForm, props, context));
    afterEach(componentTestUtils.cleanup);

    it("edits a book", function() {
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).to.exist;

      var authorField = componentTestUtils.findByAttribute(bookForm, "data-field", "author");
      expect(authorField.getDOMNode().value).to.equal(book.author);

      var titleField = componentTestUtils.findByAttribute(bookForm, "data-field", "title");
      expect(titleField.getDOMNode().value).to.equal(book.title);
    });

    it("saves a book", function() {
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      TestUtils.Simulate.submit(bookForm);

      expect(props.actions.saveBook.calledWith(book)).to.equal(true);
    });

    it("cancels editing", function() {
      var cancelButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "cancel");
      TestUtils.Simulate.click(cancelButton);

      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).not.to.exist;

      var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
      TestUtils.Simulate.click(newButton);
      bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).to.exist;

      var authorField = componentTestUtils.findByAttribute(bookForm, "data-field", "author");
      expect(_.isEmpty(authorField.getDOMNode().value)).to.equal(true);

      var titleField = componentTestUtils.findByAttribute(bookForm, "data-field", "title");
      expect(_.isEmpty(titleField.getDOMNode().value)).to.equal(true);
    });
  });
});
