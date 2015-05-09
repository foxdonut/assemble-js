var BookManagerComponent = require("./books/bookManager/component");

new BookManagerComponent({
  el: "body",
  append: true,
  components: {
    "book-manager": BookManagerComponent
  }
});