require.config({
  packages: [
    { name: "lodash", location: "node_modules/lodash", main: "index" },
    { name: "meld", location: "node_modules/meld", main: "meld" },
    { name: "poly", location: "node_modules/poly", main: "poly" },
    { name: "rest", location: "node_modules/rest", main: "rest" },
    { name: "when", location: "node_modules/when", main: "when" },
    { name: "wire", location: "node_modules/wire", main: "wire" }
  ],
  paths: {
    "lodash": "node_modules/lodash/index",
    "knockout": "node_modules/knockout/build/output/knockout-latest",
    "rest": "node_modules/rest/rest",
    "text": "node_modules/requirejs-text/text",
    "wire": "node_modules/wire/wire"
  }
});
