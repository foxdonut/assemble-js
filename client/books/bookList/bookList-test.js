require("../../test/testdom")();

var expect = require("chai").expect;
var sinon = require("sinon");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var componentTestUtils = require("../../test/component-test-utils");

var alt = require("../../flux/alt/alt");
var bookActions = require("../altBookActions")(alt);
var store = require("../altStore")(alt, bookActions);

var BookList = require("./component.jsx");

var bookList = [
  { author: "Test1", title: "One" },
  { author: "Test2", title: "Two" }
];

describe("BookList component", function() {
  var context = {};
  var props = {
    store: store,
    bookActions: bookActions
  };

  beforeEach(componentTestUtils.setup(BookList, props, context));
  afterEach(componentTestUtils.cleanup);

  describe("book list", function() {
    it("displays an initially empty list", function() {
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookList");
      expect(bookListElement).to.exist;
    });

    it("displays a list of books", function() {
      bookActions.data(bookList);
      var bookListElements = componentTestUtils.findAllByAttribute(context.testComponent, "data-element", "book");
      expect(bookListElements.length).to.equal(bookList.length);

      for (var i = 0, t = bookList.length; i < t; i++) {
        var bookListElement = bookListElements[i];

        var titleElement = componentTestUtils.findByAttribute(bookListElement, "data-element", "title");
        expect(titleElement.getDOMNode().textContent).to.equal(bookList[i].title);

        var authorElement = componentTestUtils.findByAttribute(bookListElement, "data-element", "author");
        expect(authorElement.getDOMNode().textContent).to.equal(bookList[i].author);
      }
    });
  });

  describe("book functions", function() {
    it("emits an event to edit a book", function() {
      var onEditSpy = sinon.spy();
      alt.createStore({bindListeners: {onEdit: bookActions.editBook}, onEdit: onEditSpy}, "TestStoreEdit");

      bookActions.data(bookList);
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var editButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "edit");
      TestUtils.Simulate.click(editButton);
      expect(onEditSpy.calledWith(bookList[0])).to.equal(true);
    });

    it("emits an event to delete a book", function() {
      var onDeleteSpy = sinon.spy();
      alt.createStore({bindListeners: {onDelete: bookActions.deleteBook}, onDelete: onDeleteSpy}, "TestStoreDelete");

      bookActions.data(bookList);
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var deleteButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "delete");
      TestUtils.Simulate.click(deleteButton);
      expect(onDeleteSpy.calledWith(bookList[0])).to.equal(true);
    });
  });
});

