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

  var dbController = function(includes, settings, consoleLevel, secrets) {

    var db;

    this.initDB = function() {
        var connectionString = "";
        connectionString += settings.database.connectionProtocol + "://";
        if (secrets) {
            if (secrets.database) {
                if (secrets.database.username) {
                    connectionString += secrets.database.username + ":";
                    connectionString += secrets.database.password + "@";
                }
            }
        }
        connectionString += settings.database.connectionDomain + ":";
        connectionString += settings.database.connectionPort + "/";
        connectionString += settings.database.databaseName;

        includes.mongoDBClient.connect(connectionString, (err, database) => {
            if (err) {
                console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Error:", err);
            } else {
                if (2 & consoleLevel || consoleLevel < 0) {
                    console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Successfully connected to database:", database.databaseName);
                }

                if (database.collection('content').find()) {
                    database.collection('content', function(err, collection) {
                        if (err) {
                            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Error using collection: ", err);
                        } else {
                            console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Established collection sync");
                        }
                    });
                } else {
                    database.createCollection('content', {strict:true}, function(err, collection) {
                        if (err) {
                            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Error creating collection: ", err);
                        } else {
                            console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Created a new collection.");
                        }
                    });
                }
                db = database;
            }
        });
    };

    this.getcurrentDatabase = function() {
        return db;
    }

    this.init = function () {
      this.initDB();

      if (1 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::init(): Completed");
      }

    }

    return this;

  }

  module.exports = dbController;
})(module);