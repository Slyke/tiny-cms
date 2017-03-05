(function(module){
  module.exports = {};

  // This file handles the REST and websocket endpoints.
  // Since we're all adults here, we'll use callbacks in the socket hooks, instead of hardcode.

  /*
    Console Log Bitwise enum:
      Warning: Turning off bitwise console logs will disable console logs for errors and non errors.
        1  - init()
        2  - initREST()


        X | -1 - All On

  // */

  var apiController = function(includes, settings, consoleLevel) {

    consoleLevel = (consoleLevel === undefined || consoleLevel == null ? 0 : consoleLevel);

    this.initREST = function () {
      if (2 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | endPoints::setupAPIEndPoints(): Loading API Endpoints");
      }

      includes.app.get('/detailsbyid/*', function(req, res) { includes.apiCallbacks.getByID(req, res, true); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /detailsbyid/*");
      }

      includes.app.get('/detailsbyname/*', function(req, res) { includes.apiCallbacks.getByName(req, res, true); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /detailsbyname/*");
      }

      includes.app.get('/byid/*', includes.apiCallbacks.getByID);
      if (2 & consoleLevel) {
        console.log("  [GET]::  /byid/*");
      }

      includes.app.get('/byname/*', includes.apiCallbacks.getByName);
      if (2 & consoleLevel) {
        console.log("  [GET]::  /byname/*");
      }

      includes.app.get('/singlebyid/*', includes.apiCallbacks.getSingleByID);
      if (2 & consoleLevel) {
        console.log("  [GET]::  /singlebyid/*");
      }

      includes.app.get('/singlebyname/*', includes.apiCallbacks.getSingleByName);
      if (2 & consoleLevel) {
        console.log("  [GET]::  /singlebyname/*");
      }

      if (2 & consoleLevel) {
        console.log("");
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | apiController::initREST(): Completed");
      }
    };

    this.init = function () {
      this.initREST();

      if (1 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | apiController::init(): Completed");
      }

    }

    return this;

  }

  module.exports = apiController;
})(module);