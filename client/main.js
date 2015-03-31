define(function(require, exports, module) {

var _ = require("lodash");
/*
require("wire/aop");
require("wire/debug"); 
require("./resource/client");
require("./resource/stir");
require("./component/registry");
require("./books/bookList/viewModel");
require("./modelViewBinding");
  
var bookListComponent = {
  viewModel: { instance: require("./books/bookList/viewModel") },
  template: require("text!./books/bookList/view.html")
};
*/

module.exports = _.extend(
  {
    $plugins: [
      require("wire/aop")/*,
      require("wire/debug")*/
    ]
  },
  require("./books/bookList/wire-spec"), {

  /*
  modelViewBinding: {
    module: require("knockout"),
    ready: "applyBindings"
  }
  */

  modelViewBinding: {
    module: require("./modelViewBinding"),
    ready: "applyBindings"
  }
});

/*
module.exports = {
  $plugins: [
    require("wire/aop")*//*,
    "wire/debug"*/
    /*require("wire/aop")*//*,
    require("wire/debug")*//*
  ],

  bookListRegistry: {
    module: "component/registry",
    init: {
      register: [ "book-list", bookListComponent ]
    }
  },
  
  client: {
    create: {
      module: "resource/client"
    }
  },

  stir: {
    create: {
      module: "resource/stir",
      args: { $ref: "client" }
    }
  },
  
  bookResource: {
    create: { $ref: "stir", args: "/books" },
    ready: "query"
  },

  bookListViewModel: {
    module: "books/bookList/viewModel",
    
    afterFulfilling: {
      "bookResource.query": "bookResource.getEntity | books"
    },
    
    afterReturning: {
      *//*
      deleteBook: "log",
      log: "bookResource.delete"
      *//*
      deleteBook: "bookResource.delete"
    }
  },
  *//*
  modelViewBinding: {
    module: require("knockout"),
    ready: "applyBindings"
  }
  *//*
  modelViewBinding: {
    module: "modelViewBinding",
    ready: "applyBindings"
  
  }
}
*/

});
