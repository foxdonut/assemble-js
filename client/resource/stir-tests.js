var expect = require("chai").expect;
var sinon = require("sinon");

var client = require("./client");
var baseUrl = "/test";
var stir = require("./stir")(client)(baseUrl);

describe("stir", function() {
  var xhr, requests;

  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];
    xhr.onCreate = function (req) {
      requests.push(req);
    };
  });
  
  afterEach(function() {
    xhr.restore();
  });

  it("issues a GET request for query", function() {
    stir.get(42);
    expect(requests.length).to.equal(1);
    expect(requests[0].url).to.equal(baseUrl);
  });
});