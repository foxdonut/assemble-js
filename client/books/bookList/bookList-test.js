require("../../test/testdom")();

var expect = require("chai").expect;
var sinon = require("sinon");

var React = require("react/addons");
var TestUtils = React.addons.TestUtils;

var componentTestUtils = require("../../test/component-test-utils");

var BookList = require("./component.jsx");

var bookList = [
  { id: 1, author: "Test1", title: "One" },
  { id: 2, author: "Test2", title: "Two" }
];

describe("BookList component", function() {
  var context = {};
  afterEach(componentTestUtils.cleanup);

  describe("book list", function() {
    var props = {
      model: {
        bookList: bookList
      }
    };

    beforeEach(componentTestUtils.setup(BookList, props, context));

    it("displays an initially empty list", function() {
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "bookList");
      expect(bookListElement).to.exist;
    });

    it("displays a list of books", function() {
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
    var props = {
      model: {
        bookList: bookList
      },
      actions: {
        editBook: sinon.spy(),
        deleteBook: sinon.spy()
      }
    };

    beforeEach(componentTestUtils.setup(BookList, props, context));

    it("emits an event to edit a book", function() {
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var editButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "edit");
      TestUtils.Simulate.click(editButton);
      expect(props.actions.editBook.calledWith(bookList[0])).to.equal(true);
    });

    it("emits an event to delete a book", function() {
      var bookListElement = componentTestUtils.findByAttribute(context.testComponent, "data-element", "book");
      var deleteButton = componentTestUtils.findByAttribute(bookListElement, "data-action", "delete");
      TestUtils.Simulate.click(deleteButton);
      expect(props.actions.deleteBook.calledWith(bookList[0])).to.equal(true);
    });
  });
});

