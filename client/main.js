define(function(require, exports, module) {

var _ = require("lodash");
var aop = require("wire/aop");

/*
module.exports = _.extend(
  {
    $plugins: [
      require("wire/aop")*//*,
      require("wire/debug")*//*
    ]
  },
  require("./books/bookList/wire-spec"), {
  */
  /*
  modelViewBinding: {
    module: require("knockout"),
    ready: "applyBindings"
  }
  */
  /*
  modelViewBinding: {
    module: require("./modelViewBinding"),
    ready: "applyBindings"
  }
});
*/
  
module.exports = {
  $plugins: [
    "wire/aop"
    /*require("wire/aop")*//*,
    require("wire/debug")*/
  ],
  
  client: {
    create: {
      module: require("./resource/client")
    }
  },

  stir: {
    create: {
      module: require("./resource/stir"),
      args: { $ref: "client" }
    }
  },
  
  bookResource: {
    create: { $ref: "stir", args: "/books" },
    ready: "query"
  },

  bookListViewModel: {
    module: require("./books/bookList/viewModel"),
    
    afterFulfilling: {
      "bookResource.query": "bookResource.getEntity | books"
    },
    
    afterReturning: {
      /*
      deleteBook: "log",
      log: "bookResource.delete"
      */
      deleteBook: "bookResource.delete"
    }
  },

  bookListRegistry: {
    module: require("./component/registry"),
    init: {
      register: [ "book-list", require("./books/bookList/component") ]
    }
  },
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
}

});
