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

    this.getByName = function(req, res, detailed) {

      var nameList = req.url.split('/');

      nameList.splice(0, 2); // Remove the "" and "/" on the front of the array.

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
    
    this.getByID = function(req, res, detailed) {

      var idList = req.url.split('/');

      idList.splice(0, 2); // Remove the "" and "/" on the front of the array.

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