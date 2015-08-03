var bookActions = function(alt) {
  return alt.generateActions([
    "initialize", "data", "deleteBook", "newBook", "editBook", "saveBook", "cancelBook"
  ]);
};

module.exports = bookActions;
