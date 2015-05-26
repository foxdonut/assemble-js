var expect = require("chai").expect;
var sinon = require("sinon");
var client = sinon.spy();
var baseUrl = "/test";
var stir = require("./stir")(client)(baseUrl);

describe("resource/stir-test", function() {
  it("issues a GET request", function() {
    var id = 42;
    stir.get(id);
    expect(client.calledWith({method: "GET", path: baseUrl + "/" + id})).to.equal(true);
  });
});
