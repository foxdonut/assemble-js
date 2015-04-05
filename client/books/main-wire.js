module.exports = {
  booksComponent: {
    module: require("../component/registry"),
    register: [ "book-list", require("./bookList/component") ]
  }
};