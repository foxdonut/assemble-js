jest.dontMock("../component");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var componentTestUtils = require("../../../test/component-test-utils");

var BookList = require("../component");
var BookEvents = require("../../events");
var pubsub = require("../../../pubsub/pubsub-jquery");

var bookList = [
  { author: "Test1", title: "One" },
  { author: "Test2", title: "Two" }
];

describe("BookList component", function() {
  var context = {};

  beforeEach(componentTestUtils.setup(BookList, pubsub, context));
  afterEach(componentTestUtils.cleanup);

  describe("book list", function() {
    it("displays an initially empty list", function() {
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookList");
      expect(bookListElement).toBeDefined();
    });

    it("displays a list of books", function() {
      pubsub.publish(BookEvents.DATA, bookList);
      var bookListElements = componentTestUtils.findAllByAttribute(context.testComponent, "data-element", "book");
      expect(bookListElements.length).toEqual(bookList.length);

      for (var i = 0, t = bookList.length; i < t; i++) {
        var bookListElement = bookListElements[i];

        var titleElement = componentTestUtils.findByAttribute(bookListElement, "data-element", "title");
        expect(titleElement.getDOMNode().textContent).toEqual(bookList[i].title);

        var authorElement = componentTestUtils.findByAttribute(bookListElement, "data-element", "author");
        expect(authorElement.getDOMNode().textContent).toEqual(bookList[i].author);
      }
    });
  });

  describe("book functions", function() {
    it("emits an event to edit a book", function() {
      var onEditSpy = jasmine.createSpy("onEdit");
      pubsub.subscribe(BookEvents.EDIT, onEditSpy);
      
      pubsub.publish(BookEvents.DATA, bookList);
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var editButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "edit");
      TestUtils.Simulate.click(editButton);
      expect(onEditSpy).toHaveBeenCalledWith(bookList[0]);
    });

    it("emits an event to delete a book", function() {
      var onDeleteSpy = jasmine.createSpy("onDelete");
      pubsub.subscribe(BookEvents.DELETE, onDeleteSpy);
      
      pubsub.publish(BookEvents.DATA, bookList);
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var deleteButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "delete");
      TestUtils.Simulate.click(deleteButton);
      expect(onDeleteSpy).toHaveBeenCalledWith(bookList[0]);
    });
  });
});

