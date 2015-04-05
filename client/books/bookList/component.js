module.exports = {
  viewModel: require("./viewModel"),

  component: {
    viewModel: { $ref: "viewModel" },
    template: require("./template.html")
  }
};
