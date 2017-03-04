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

    this.getByName = function(req, res) {

      var nameList = req.url.split('/');

      nameList.splice(0, 2); // Remove the "" and "/" on the front of the array.

      var jsonReturn = {};
      jsonReturn.results = [];
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
                  objContent[nameList[index]] = result[0].content;
                  jsonReturn.results.push(objContent);
                } else {
                  jsonReturn.noEntry.push(nameList[index]);
                }

                if ((jsonReturn.results.length + jsonReturn.noEntry.length) >= nameList.length) {
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
    
    this.getByID = function(req, res) {

      var idList = req.url.split('/');

      idList.splice(0, 2); // Remove the "" and "/" on the front of the array.

      includes.dbController.getEntryByName(idList[0], function(err, result) {
        if (err) {
          console.error(Math.round(new Date().getTime() / 1000).toString(), " | apiCallbacks::getByID(): Error:", err);
        } else {
          res.send({
            "idList":idList,
            "result":result
          });
        }
      })


    };

    return this;

  }

  module.exports = apiCallbacks;
})(module);