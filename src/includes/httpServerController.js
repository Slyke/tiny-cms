(function(module){
  module.exports = {};

  // This file controls the HTTP server's listening.

  var httpServerController = function(includes, settings, consoleLevel) {

    consoleLevel = (consoleLevel === undefined || consoleLevel == null ? 0 : consoleLevel);

    var serverPort = null;
    var serverIP = null;

    this.init = function() {
      serverPort = process.env[settings.network.http.envPort] || settings.network.http.port;
      serverIP = process.env[settings.network.http.envIP] || settings.network.http.ip;

      if (1 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | httpServerController::init(): Completed");
      }

    };

    this.startListening = function() {

      includes.http.listeningHTTPServer = includes.http.listen(serverPort, serverIP, function () {
        if (2 & consoleLevel || consoleLevel < 0) {
          console.log(Math.round(new Date().getTime() / 1000).toString(), " | httpServerController::startListening(): Server Listening: ", serverIP, serverPort);
        }
      });

    };

    return this;

  }

  module.exports = httpServerController;
})(module);

