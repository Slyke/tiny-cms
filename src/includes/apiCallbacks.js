(function(module){
  module.exports = {};

  // This file handles the REST and websocket endpoints.

  var apiCallbacks = function(includes, settings, consoleLevel) {

    consoleLevel = (consoleLevel === undefined || consoleLevel == null ? 0 : consoleLevel);

    this.init = function() {

      if (1 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::init(): Completed");
      }

    };

    this.getEntry = function(req, res) {
      //https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html
      res.send({
        "message":"bob"
      });
    };

    return this;

  }

  module.exports = apiCallbacks;
})(module);