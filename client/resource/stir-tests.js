var expect = require("chai").expect;
var sinon = require("sinon");

var client = require("./client")();
var baseUrl = "/test";
var stir = require("./stir")(client)(baseUrl);

describe("stir", function() {
  var server = null;

  beforeEach(function() {
    server = sinon.fakeServer.create();
    server.autoRespond = true;
  });

  afterEach(function() {
    server.restore();
  });

  it("issues a GET request for query", function(done) {
    var id = 42;
    
    server.respondWith([
      200,
      { "Content-Type": "application/json" },
      JSON.stringify({ id: id, title: "Test", author: "Test" })      
    ]);

    stir.get(id).then(function() {
      done();
    });
  });
});
