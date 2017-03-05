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
    var ObjectID = require('mongodb').ObjectID;

    var db;
    var dbCollection;
    var collectionName;

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

                var cmsContentCollection;

                if (database.collection(collectionName).find()) {
                    cmsContentCollection = database.collection(collectionName, function(err, collection) {
                        if (err) {
                            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Error using collection: ", err);
                        } else {
                            console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Established collection sync");
                        }
                    });
                } else {
                    cmsContentCollection = database.createCollection(collectionName, {strict:true}, function(err, collection) {
                        if (err) {
                            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Error creating collection: ", err);
                        } else {
                            console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::initDB(): Created a new collection.");
                        }
                    });
                }
                db = database;
                dbCollection = cmsContentCollection;

            }
        });
    };

    this.getcurrentDatabase = function() {
        return db;
    }

    this.addEntry = function(entryName, entryContent, createdTime, callback) {
        var database = this.getcurrentDatabase();

        createdTime = (createdTime ? createdTime : Math.round(new Date().getTime() / 1000).toString());
        callback = (callback ? callback : function(){});

        try {
            var cmsContentCollection = database.collection(collectionName, function(err, collection) {
                try {
                    var result = collection.insertOne( { "name": entryName, "content": entryContent, "createdTime": createdTime }, callback );
                } catch (err) {
                    console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::addEntry(): Error writing to collection: ", err);
                    callback("Error writing collection", []);
                };
            });
        } catch (err) {
            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::addEntry(): Error getting collection: ", err);
            callback("Error getting collection", []);
        }
    };

    this.getAllEntriesByID = function(entryID, foundCallback) {
        var database = this.getcurrentDatabase();

        try {
            var cmsContentCollection = database.collection(collectionName, function(err, collection) {
                if (err) {
                    console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByID(): Error reading record: ", err);
                    foundCallback(err);
                } else {
                    try {
                        collection.findOne({ "_id": new ObjectID(entryID) }, function (err, item) {
                            includes.dbController.getAllEntriesByName(item.name, foundCallback);
                        });
                    } catch (err) {
                        //Return an empty item instead of erroring the entire request.
                        if (err.message.indexOf("String of 12 bytes or a string of 24 hex characters") > -1 || err.message.indexOf("hex is not a function") > -1 ) {
                            foundCallback(null, []);
                        } else {
                            throw err;
                        }
                    }
                }
            });
        } catch (err) {
            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByID(): Error reading collection: ", err);
            foundCallback(err);
        }
    };

    this.getAllEntriesByName = function(entryName, foundCallback) {
        var database = this.getcurrentDatabase();

        try {
            var cmsContentCollection = database.collection(collectionName, function(err, collection) {
                if (err) {
                    console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByName(): Error reading record: ", err);
                    foundCallback(err);
                } else {
                    collection.find({ $query: { "name": entryName } }).sort({"createdTime": 1}).toArray(function (err, item) {
                        foundCallback(err, item);
                    });
                }
            });
        } catch (err) {
            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByName(): Error reading collection: ", err);
            foundCallback(err);
        }
    };

    this.getEntryByName = function(entryName, foundCallback) {
        var database = this.getcurrentDatabase();

        try {
            var cmsContentCollection = database.collection(collectionName, function(err, collection) {
                if (err) {
                    console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByName(): Error reading record: ", err);
                    foundCallback(err);
                } else {
                    collection.find({ $query: { "name": entryName } }).sort({"createdTime": 1}).limit(1).toArray(function (err, item) {
                        foundCallback(err, item);
                    });
                }
            });
        } catch (err) {
            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByName(): Error reading collection: ", err);
            foundCallback(err);
        }
    };

    this.getEntryByID = function(entryID, foundCallback) {
        var database = this.getcurrentDatabase();

        try {
            var cmsContentCollection = database.collection(collectionName, function(err, collection) {
                if (err) {
                    console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByID(): Error reading record: ", err);
                    foundCallback(err);
                } else {
                    try {
                        collection.findOne({ "_id": new ObjectID(entryID) }, function (err, item) {
                            foundCallback(err, item);
                        });
                    } catch (err) {
                        //Return an empty item instead of erroring the entire request.
                        if (err.message.indexOf("String of 12 bytes or a string of 24 hex characters") > -1 || err.message.indexOf("hex is not a function") > -1 ) {
                            foundCallback(null, {});
                        } else {
                            throw err;
                        }
                    }
                }
            });
        } catch (err) {
            console.error(Math.round(new Date().getTime() / 1000).toString(), " | dbController::getEntryByID(): Error reading collection: ", err);
            foundCallback(err);
        }
    };

    this.init = function () {

      collectionName = settings.database.contentCollectionName;

      this.initDB();

      if (1 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | dbController::init(): Completed");
      }

    };

    return this;

  }

  module.exports = dbController;
})(module);