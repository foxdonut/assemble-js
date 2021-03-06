require("../../test/testdom")();

var expect = require("chai").expect;
var sinon = require("sinon");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var _ = require("lodash");

var componentTestUtils = require("../../test/component-test-utils");

var BookForm = require("./component.jsx");
var BookEvents = require("../events");
var pubsub = require("../../pubsub/pubsub-jquery");

var book = { author: "Test1", title: "One" };

describe("BookForm component", function() {
  var context = {};

  beforeEach(componentTestUtils.setup(BookForm, pubsub, context));
  afterEach(componentTestUtils.cleanup);

  describe("initial", function() {
    it("renders a New button", function() {
      var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
      expect(newButton).to.exist;
    });

    it("does not render the form", function() {
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).not.to.exist;
    });

    it("renders the form after pressing the New button", function() {
      var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
      TestUtils.Simulate.click(newButton);
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).to.exist;
    });
  });

  describe("book functions", function() {
    it("edits a book", function() {
      pubsub.publish(BookEvents.EDIT, book);

      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      expect(bookForm).to.exist;

      var authorField = componentTestUtils.findByAttribute(bookForm, "data-field", "author");
      expect(authorField.getDOMNode().value).to.equal(book.author);

      var titleField = componentTestUtils.findByAttribute(bookForm, "data-field", "title");
      expect(titleField.getDOMNode().value).to.equal(book.title);
    });

    it("saves a book", function() {
      var onSave = sinon.spy();
      pubsub.subscribe(BookEvents.SAVE, onSave);

      pubsub.publish(BookEvents.EDIT, book);
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
      TestUtils.Simulate.submit(bookForm);

      expect(onSave.calledWith(book)).to.equal(true);
    });

    it("cancels editing", function() {
      pubsub.publish(BookEvents.EDIT, book);

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
