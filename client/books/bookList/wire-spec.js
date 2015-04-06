module.exports = {
  bookListComponent: {
    module: require("../../component/registry"),
    register: [ "book-list", {
      viewModel: require("./viewModel"),
      template: require("./template")
    } ]
  }
};
