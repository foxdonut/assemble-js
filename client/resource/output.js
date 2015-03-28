define(function(require, exports, module) {

module.exports = {
  log: function(response) {
    console.log("received:", response.entity);
  }
};

});
