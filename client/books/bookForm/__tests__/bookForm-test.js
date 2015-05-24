jest.dontMock("../component");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var componentTestUtils = require("../../../test/component-test-utils");

var BookForm = require("../component");
var BookEvents = require("../../events");
var pubsub = require("../../../pubsub/pubsub-jquery");

var book = { author: "Test1", title: "One" };

describe("BookForm component", function() {
  var context = {};

  beforeEach(componentTestUtils.setup(BookForm, pubsub, context));
  afterEach(componentTestUtils.cleanup);

  describe("initial", function() {
    it("renders a New button", function() {
      var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
      expect(newButton).toBeDefined();
    });

    it("does not render the form", function() {
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
			expect(bookForm).toBeNull();
    });
		
		it("renders the form after pressing the New button", function() {
			var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
			TestUtils.Simulate.click(newButton);
			var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
			expect(bookForm).not.toBeNull();
		});
  });

  describe("book functions", function() {
    it("edits a book", function() {
			pubsub.publish(BookEvents.EDIT, book);

			var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
			expect(bookForm).not.toBeNull();

      var authorField = componentTestUtils.findByAttribute(bookForm, "data-field", "author");
			expect(authorField.getDOMNode().value).toEqual(book.author);
			
      var titleField = componentTestUtils.findByAttribute(bookForm, "data-field", "title");
			expect(titleField.getDOMNode().value).toEqual(book.title);
    });

    it("saves a book", function() {
			var onSave = jasmine.createSpy("onSave");
			pubsub.subscribe(BookEvents.SAVE, onSave);

			pubsub.publish(BookEvents.EDIT, book);
			var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
			TestUtils.Simulate.submit(bookForm);
			
			expect(onSave).toHaveBeenCalledWith(book);
    });

    it("cancels editing", function() {
			pubsub.publish(BookEvents.EDIT, book);
			
			var cancelButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "cancel");
			TestUtils.Simulate.click(cancelButton);
			
      var bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
			expect(bookForm).toBeNull();
			
			var newButton = componentTestUtils.findByAttribute(context.testComponent, "data-action", "new");
			TestUtils.Simulate.click(newButton);
			bookForm = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookForm");
			expect(bookForm).not.toBeNull();

      var authorField = componentTestUtils.findByAttribute(bookForm, "data-field", "author");
			expect(authorField.getDOMNode().value).toBeNull();
			
      var titleField = componentTestUtils.findByAttribute(bookForm, "data-field", "title");
			expect(titleField.getDOMNode().value).toBeNull();
		});
  });
});
