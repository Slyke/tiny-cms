// Main server file.

( function() {

  var includes = {}; // Setup container for all the includes we'll be using in node.
  var settings = null; // Hold server settings.
  var secrets = null; // Hold server secrets.

  var settingsFile = "settings.json";
  var secretsFile = "secrets.json";

  var setupDependencies = function(dependencies) {
    includes.express = require('express');
    includes.app = includes.express();
    includes.http = require('http').Server(includes.app);

    includes.settingsController = require("./includes/settingsController.js");
    includes.dbController = require("./includes/dbController.js");
    includes.apiCallbacks = require("./includes/apiCallbacks.js");
    includes.httpServerController = require("./includes/httpServerController.js");
    includes.apiController = require("./includes/apiController.js");
    includes.fs = require('fs');
    includes.mongoDBClient = require('mongodb').MongoClient;
    includes.bodyParser = require('body-parser'); 

  };

  var init = function () {
    includes.settingsController = includes.settingsController(includes, settings, -1); //Instantiate settings controller
    includes.settingsController.init();

    settings = includes.settingsController.readSettings(settingsFile); //Load settings from settings file.
    secrets = includes.settingsController.readSettings(secretsFile); //Load settings from settings file

    if (!settings) { //Exit if settings are not loaded.
      console.log("Error: Couldn't read settings file. ");
      console.log("Exiting... ");
      process.exit(1);
    }

  };

  var setupServer = function() {

    includes.apiCallbacks = includes.apiCallbacks(includes, settings, settings.server.consoleLevel); // API Callbacks
    includes.apiCallbacks.init();

    includes.apiController = includes.apiController(includes, settings, settings.server.consoleLevel); //Instantiate api controller
    includes.apiController.init();

    includes.dbController = includes.dbController(includes, settings, settings.server.consoleLevel, secrets); //Database controller
    includes.dbController.init();

    includes.httpServerController = includes.httpServerController(includes, settings, settings.server.consoleLevel);
    includes.httpServerController.init();
    includes.httpServerController.startListening();

  };

  // Start all the things
  setupDependencies(includes);
  init();
  setupServer();

})();