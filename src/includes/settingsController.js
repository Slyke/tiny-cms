(function(module){
  module.exports = {};

  // Settings file controller.
  /*
    Console Log Bitwise enum:
      Warning: Turning off bitwise console logs will disable console logs for errors and non errors.
        1 - init()
        2 - writeSettings()
        4 - readSettings()

        7 | -1 - All On

  // */

  var settingsController = function(includes, settings, consoleLevel) {

    consoleLevel = (consoleLevel === undefined || consoleLevel == null ? 0 : consoleLevel);

    var defaultSettingsFileName = "settings.json";

    var monitoringSettings = null;

    this.init = function() {

      monitoringSettings = false;

      if (1 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | settingsController::init(): Completed");
      }

    };

    this.writeSettings = function(newSettings) {
      includes.fs.writeFile(defaultSettingsFileName, JSON.stringify(newSettings, null, settings.outputs.jsonSpaces), function (err) {
        if (2 & consoleLevel || consoleLevel < 0) {
          if (err) {
            console.log(Math.round(new Date().getTime() / 1000).toString(), " | settingsController::writeSettings(): Error: ", err);
          } else {
            console.log(Math.round(new Date().getTime() / 1000).toString(), " | settingsController::writeSettings(): : Settings written to file.");
          }
        }
      });
    };

    this.readSettings = function(settingsFilePath) {

      settingsFilePath = (settingsFilePath ? settingsFilePath : defaultSettingsFileName);

      try {
        settings = JSON.parse(includes.fs.readFileSync(settingsFilePath));
      } catch (e) {
        if (4 & consoleLevel || consoleLevel < 0) {
          console.log(Math.round(new Date().getTime() / 1000).toString(), " | settingsController::readSettings(): Error: ", e);
        }
        return false;
      }

      if (4 & consoleLevel || consoleLevel < 0) {
        console.log(Math.round(new Date().getTime() / 1000).toString(), " | settingsController::readSettings(): Loaded settings.");
      }

      this.monitorSettingsCheck();

      return settings;

    };

    this.monitorSettingsCheck = function(settingsFilePath) { //Monitor the settings file for changes, and reload it if changes are detected.

      settingsFilePath = (settingsFilePath ? settingsFilePath : defaultSettingsFileName);

      if (monitoringSettings) {
        monitoringSettings.close();
      }

      if (settings.monitorSettingsFile) {
        monitoringSettings = includes.fs.watch(settingsFilePath, function (currentTime, previousTime) {
          includes.settingsController.readSettings(settingsFilePath);
        });
      }
    };

    this.updateSettings = function(newSettings, validityCallback) {
      var oldSettings = JSON.stringify(JSON.parse(settings));

      //TODO: Check settings validity function
      if (validityCallback) {
        if (validityCallback(newSettings)) {
          settings = newSettings;
        } else {
          return false;
        }
      }

      settings = newSettings;
      this.writeSettings(settings);
    };

    return this;
  }

  module.exports = settingsController;
})(module);