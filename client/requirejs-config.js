require.config({
  packages: [
    { name: "meld", location: "node_modules/meld", main: "meld" },
    { name: "poly", location: "node_modules/poly", main: "poly" },
    { name: "rest", location: "node_modules/rest", main: "rest" },
    { name: "when", location: "node_modules/when", main: "when" },
    { name: "wire", location: "node_modules/wire", main: "wire" }
  ],
  paths: {
    "rest": "node_modules/rest/rest",
    "wire": "node_modules/wire/wire"
  }
});
