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

      includes.app.get('/byid/*', function(req, res) { includes.apiCallbacks.getByID(req, res, "/byid", false); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /byid/*");
      }

      includes.app.get('/byname/*', function(req, res) { includes.apiCallbacks.getByName(req, res, "/byname", false); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /byname/*");
      }

      includes.app.get('/single/byname/*', includes.apiCallbacks.getSingleByName);
      if (2 & consoleLevel) {
        console.log("  [GET]::  /single/byname/*");
      }

      includes.app.get('/single/byid/*', includes.apiCallbacks.getSingleByID);
      if (2 & consoleLevel) {
        console.log("  [GET]::  /single/byid/*");
      }

      includes.app.get('/details/byid/*', function(req, res) { includes.apiCallbacks.getByID(req, res, "/details/byid", true); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /details/byid/*");
      }

      includes.app.get('/details/byname/*', function(req, res) { includes.apiCallbacks.getByName(req, res, "/details/byname", true); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /details/byname/*");
      }

      includes.app.get('/all/byid/*', function(req, res) { includes.apiCallbacks.getAllByID(req, res, "/all/byid/"); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /all/byid/*");
      }

      includes.app.get('/all/byname/*', function(req, res) { includes.apiCallbacks.getAllByName(req, res, "/all/byname/"); });
      if (2 & consoleLevel) {
        console.log("  [GET]::  /all/byname/*");
      }

      includes.app.post('/add', includes.bodyParser.json(), function(req, res) { includes.apiCallbacks.addEntries(req, res, "/add"); });
      if (2 & consoleLevel) {
        console.log("  [POST]::  /add");
      }

      includes.app.post('/delete/byname/*', includes.bodyParser.json(), function(req, res) { includes.apiCallbacks.deleteEntriesByName(req, res, "/delete/byname/"); });
      if (2 & consoleLevel) {
        console.log("  [POST]::  /delete/byname/*");
      }

      includes.app.post('/delete/byid/*', includes.bodyParser.json(), function(req, res) { includes.apiCallbacks.deleteEntriesByID(req, res, "/delete/byid/"); });
      if (2 & consoleLevel) {
        console.log("  [POST]::  /delete/byid/*");
      }

      if (2 & consoleLevel) {
        console.log("");
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | apiController::initREST(): Completed");
      }
    };

    this.init = function () {
      this.initREST();

      // includes.app.use(includes.bodyParser.urlencoded({ extended: false }));
      // includes.app.use(includes.bodyParser.json());

      if (1 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | apiController::init(): Completed");
      }

    }

    return this;

  }

  module.exports = apiController;
})(module);