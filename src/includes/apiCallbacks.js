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

    this.deleteEntriesByID = function(req, res, urlRemove) {

      var idList = req.url.replace(urlRemove, "").split('/');

      var jsonReturn = {};
      jsonReturn.entriesDeleted = [];
      jsonReturn.failedEntries = [];
      jsonReturn.execTime = Math.round(new Date().getTime() / 1000).toString();

      for (var i = 0; i < idList.length; i++) {
        try {
          (function(index) {
            includes.dbController.deleteEntryByID(idList[index], function(err, result) {
              if (err) {
                console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::deleteEntriesByID(): Error:", err);
                res.send({
                  "idList":idList,
                  "result":[],
                  "error":"Error deleting from database."
                });
              } else {
                if (result && result) {
                  jsonReturn.entriesDeleted.push(idList[index]);
                } else {
                  jsonReturn.failedEntries.push(idList[index]);
                }

                if ((jsonReturn.entriesDeleted.length + jsonReturn.failedEntries.length) >= idList.length) {
                  res.send(jsonReturn);
                }
              }
            });
          })(i);
        } catch (err) {
          console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::deleteEntriesByID(): Error:", err);
          res.send({
            "idList":idList,
            "result":[],
            "error":"Error attempting to delete from database."
          });
        }
      }
    };

    this.deleteEntriesByName = function(req, res, urlRemove) {

      var nameList = req.url.replace(urlRemove, "").split('/');

      var jsonReturn = {};
      jsonReturn.entriesDeleted = [];
      jsonReturn.failedEntries = [];
      jsonReturn.execTime = Math.round(new Date().getTime() / 1000).toString();

      for (var i = 0; i < nameList.length; i++) {
        try {
          (function(index) {
            includes.dbController.deleteEntryByName(nameList[index], function(err, result) {
              if (err) {
                console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::deleteEntriesByName(): Error:", err);
                res.send({
                  "nameList":nameList,
                  "result":[],
                  "error":"Error deleting from database."
                });
              } else {
                if (result && result) {
                  jsonReturn.entriesDeleted.push(nameList[index]);
                } else {
                  jsonReturn.failedEntries.push(nameList[index]);
                }

                if ((jsonReturn.entriesDeleted.length + jsonReturn.failedEntries.length) >= nameList.length) {
                  res.send(jsonReturn);
                }
              }
            });
          })(i);
        } catch (err) {
          console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::deleteEntriesByName(): Error:", err);
          res.send({
            "nameList":nameList,
            "result":[],
            "error":"Error attempting to delete from database."
          });
        }
      }
    };

    this.addEntries = function(req, res) {

      var addEntries;

      try {
        addEntries = JSON.parse(JSON.stringify(req.body));
      } catch (err) {
        console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::addEntries(): Error, bad JSON:", err);
        res.send({
          "result":[],
          "error":"Error: Couldn't understand JSON."
        });
        return err;
      }
      
      var entriesAdded = [];
      var entriesFailed = [];

      try {
        for (var i in addEntries.entries) {
          (function(index){
            includes.dbController.addEntry(index, addEntries.entries[index].content, null, function(err, result) {
              if (!err && result) {
                var pushObj = {};
                pushObj[index] = result.ops;
                entriesAdded.push(pushObj);
              } else {
                entriesFailed.push(index);
              }
              if ((entriesAdded.length + entriesFailed.length) >= Object.keys(addEntries.entries).length) {
                res.send({
                  "result":{
                    "entriesAdded":entriesAdded,
                    "failedEntries":entriesFailed
                  }
                });
              }
            });
          })(i);
        }
      } catch(err) {
        console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::addEntries(): Error trying to add entry:", err);
        entriesFailed.push(index);
        if ((entriesAdded.length + entriesFailed.length) >= addEntries.entries.length) {
          res.send({
            "result":{
              "entriesAdded":entriesAdded,
              "failedEntries":entriesFailed
            }
          });
        }
      }
    }

    this.getAllByName = function(req, res, urlRemove) {

      var nameList = req.url.replace(urlRemove, "").split('/');

      var jsonReturn = {};
      jsonReturn.results = {};
      jsonReturn.execTime = Math.round(new Date().getTime() / 1000).toString();

      for (var i = 0; i < nameList.length; i++) {
        try {
          (function(index) {
            includes.dbController.getAllEntriesByName(nameList[index], function(err, result) {
              if (err) {
                console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByName(): Error:", err);
                res.send({
                  "nameList":nameList,
                  "result":[],
                  "error":"Error reading from database."
                });
              } else {
                if (result) {
                  var objContent = {};
                  objContent = result;
                  jsonReturn.results[nameList[index]] = objContent;
                }

                if (Object.keys(jsonReturn.results).length >= nameList.length) {
                  res.send(jsonReturn);
                }
              }
            });
          })(i);
        } catch (err) {
          console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByName(): Error:", err);
          res.send({
            "nameList":nameList,
            "result":[],
            "error":"Error reading from database."
          });
        }
      }
    }

    this.getAllByID = function(req, res, urlRemove) {

      var idList = req.url.replace(urlRemove, "").split('/');

      var jsonReturn = {};
      jsonReturn.results = {};
      jsonReturn.execTime = Math.round(new Date().getTime() / 1000).toString();

      for (var i = 0; i < idList.length; i++) {
        try {
          (function(index) {
            includes.dbController.getAllEntriesByID(idList[index], function(err, result) {
              if (err) {
                console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByID(): Error:", err);
                res.send({
                  "idList":idList,
                  "result":[],
                  "error":"Error reading from database."
                });
              } else {
                if (result) {
                  var objContent = {};
                  objContent = result;
                  jsonReturn.results[idList[index]] = objContent;
                }
                
                if (Object.keys(jsonReturn.results).length >= idList.length) {
                  res.send(jsonReturn);
                }
              }
            });
          })(i);
        } catch (err) {
          console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByID(): Error:", err);
          res.send({
            "idList":idList,
            "result":[],
            "error":"Error reading from database."
          });
        }
      }
    }

    this.getByName = function(req, res, urlRemove, detailed) {

      var nameList = req.url.replace(urlRemove, "").split('/');

      var jsonReturn = {};
      jsonReturn.results = {};
      jsonReturn.noEntry = [];
      jsonReturn.execTime = Math.round(new Date().getTime() / 1000).toString();

      for (var i = 0; i < nameList.length; i++) {
        try {
          (function(index) {
            includes.dbController.getEntryByName(nameList[index], function(err, result) {
              if (err) {
                console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByName(): Error:", err);
                res.send({
                  "nameList":nameList,
                  "result":[],
                  "error":"Error reading from database."
                });
              } else {
                if (result[0] && result[0].content) {
                  var objContent = {};
                  if (detailed) {
                    objContent = result[0];
                  } else {
                    objContent = result[0].content;
                  }
                  jsonReturn.results[nameList[index]] = objContent;
                } else {
                  jsonReturn.noEntry.push(nameList[index]);
                }

                if ((Object.keys(jsonReturn.results).length + jsonReturn.noEntry.length) >= nameList.length) {
                  res.send(jsonReturn);
                }
              }
            });
          })(i);
        } catch (err) {
          console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByName(): Error:", err);
          res.send({
            "nameList":nameList,
            "result":[],
            "error":"Error reading from database."
          });
        }
      }
    };
    
    this.getByID = function(req, res, urlRemove, detailed) {

      var idList = req.url.replace(urlRemove, "").split('/');

      var jsonReturn = {};
      jsonReturn.results = {};
      jsonReturn.noEntry = [];
      jsonReturn.execTime = Math.round(new Date().getTime() / 1000).toString();

      for (var i = 0; i < idList.length; i++) {
        try {
          (function(index) {
            includes.dbController.getEntryByID(idList[index], function(err, result) {
              if (err) {
                console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByID(): Error:", err);
                res.send({
                  "idList":idList,
                  "result":[],
                  "error":"Error reading from database."
                });
              } else {
                if (result && result.content) {
                  var objContent = {};
                  if (detailed) {
                    objContent = result;
                  } else {
                    objContent = result.content;
                  }
                  jsonReturn.results[idList[index]] = objContent;
                } else {
                  jsonReturn.noEntry.push(idList[index]);
                }
                
                if ((Object.keys(jsonReturn.results).length + jsonReturn.noEntry.length) >= idList.length) {
                  res.send(jsonReturn);
                }
              }
            });
          })(i);
        } catch (err) {
          console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByID(): Error:", err);
          res.send({
            "idList":idList,
            "result":[],
            "error":"Error reading from database."
          });
        }
      }
    };

    this.getSingleByID = function(req, res) {

      var requestedIDArr = req.url.split('/');

      requestedIDArr.splice(0, 3); // Remove the "" and "/" on the front of the array.

      var requestedID = requestedIDArr[0];

      try {
        includes.dbController.getEntryByID(requestedID, function(err, result) {
          if (err) {
            console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getSingleByID(): Error:", err);
            res.send("");
          } else {
            if (result && result.content) {
              res.send(result.content);
            } else {
              res.send("");
            }
          }
        });
      } catch (err) {
        console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getSingleByID(): Error:", err);
        res.send("");
      }
    };

    this.getSingleByName = function(req, res) {

      var requestedNameArr = req.url.split('/');

      requestedNameArr.splice(0, 3); // Remove the "" and "/" on the front of the array.

      var requestedName = requestedNameArr[0];

      try {
        
        includes.dbController.getEntryByName(requestedName, function(err, result) {
          if (err) {
            console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getSingleByName(): Error:", err);
            res.send("");
          } else {
            if (result[0] && result[0].content) {
              res.send(result[0].content);
            } else {
              res.send("");
            }
          }
        });
      } catch (err) {
        console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getSingleByName(): Error:", err);
        res.send("");
      }
    };

    return this;

  }

  module.exports = apiCallbacks;
})(module);