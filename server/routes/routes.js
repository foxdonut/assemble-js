var _ = require("lodash");

var setup = function(app) {
  var books = [
    {id: 1, title:"Stripes", author:"Daoud"},
    {id: 2, title:"Pro AngularJS", author:"Freeman"},
    {id: 3, title:"Cucumber", author:"Greenfield"},
    {id: 4, title:"Identical", author:"Turow"}
  ];

  var nextId = books.length + 1;

  var findBookById = function(id) {
    return _.where(books, {id: parseInt(id, 10)})[0];
  };

  app.get("/books", function(req, res) {
    res.json(books);
  });

  app.get("/books/:id", function(req, res) {
    res.json(findBookById(req.params.id));
  });

  app.post("/books", function(req, res) {
    var book = req.body;
    books.push(book);
    book.id = nextId;
    nextId++;
    res.json(book);
  });

  app.put("/books/:id", function(req, res) {
    var book = findBookById(req.params.id);
    book = _.extend(book, req.body);
    res.json(book);
  });

  app["delete"]("/books/:id", function(req, res) {
    for (var i = 0, t = books.length; i < t; i++) {
      if (books[i].id == req.params.id) {
        books.splice(i, 1);
        break;
      }
    }
    res.send("OK");
  });
};

module.exports = { setup : setup };