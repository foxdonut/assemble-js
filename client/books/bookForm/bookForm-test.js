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

  afterEach(componentTestUtils.cleanup);

  describe("initial", function() {
    var props = {
      model: {
        editingBook: {
        }
      }
    };

    beforeEach(componentTestUtils.setup(BookForm, props, context));

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
      }
    };

    beforeEach(componentTestUtils.setup(BookForm, props, context));

    it("renders the form in editing mode", function() {
      var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
      TestUtils.Simulate.click(newButton);
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).to.exist;
    });
  });

  xdescribe("book functions", function() {
    it("edits a book", function() {
      // bookActions.editBook(book);

      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).to.exist;

      var authorField = componentTestUtils.findByAttribute(bookForm, "data-field", "author");
      expect(authorField.getDOMNode().value).to.equal(book.author);

      var titleField = componentTestUtils.findByAttribute(bookForm, "data-field", "title");
      expect(titleField.getDOMNode().value).to.equal(book.title);
    });

    it("saves a book", function() {
      var onSaveSpy = sinon.spy();
      // alt.createStore({bindListeners: {onSave: bookActions.saveBook}, onSave: onSaveSpy}, "TestStoreEdit");

      // bookActions.editBook(book);
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      TestUtils.Simulate.submit(bookForm);

      expect(onSaveSpy.calledWith(book)).to.equal(true);
    });

    it("cancels editing", function() {
      // bookActions.editBook(book);

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
