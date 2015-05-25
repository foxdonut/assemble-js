module.exports = function(markup) {
  if (typeof document === "undefined") {
    var jsdom = require("jsdom").jsdom;
    global.document = jsdom(markup || "<!doctype html><html><body></body></html>");
    global.window = document.parentWindow;
    global.navigator = {
      userAgent: "node.js"
    };
  }
};
