module.exports = {
  createDocument: function() {
    if (typeof document === "undefined") {
      var jsdom = require("jsdom").jsdom;
      global.document = jsdom("<!doctype html><html><body></body></html>");
      global.window = document.parentWindow;
      global.navigator = {
        userAgent: "node.js"
      };
    }
  },
  clearDocument: function() {
    document.documentElement.innerHTML = "<body></body>";
  }
};
