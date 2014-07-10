// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var roamingFolder = Windows.Storage.ApplicationData.current.roamingFolder;
    var filename = "settings.txt";
    
    WinJS.UI.Pages.define("/demos/fileCreateRead/fileCreateRead.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            document.getElementById("input").addEventListener("change", this.writeData, false);
            document.getElementById("read").addEventListener("click", this.readData, false);
        },

        writeData: function() {
             //create a file and write input to it.
               roamingFolder.createFileAsync(filename, Windows.Storage.CreationCollisionOption.replaceExisting)
              .then(function (filename) {
                  var input = document.getElementById("input");
                  var savedData = input.value;
                  return Windows.Storage.FileIO.writeTextAsync(filename, savedData);
                }).done(function() {
                  //console.log("file created");
              });

        },

        readData: function () {
            roamingFolder.getFileAsync(filename)
               .then(function (file) {
                   return Windows.Storage.FileIO.readTextAsync(file);
               }).done(function (data) {
                   //log data read from the file.
                   Ocho.Logging.clearLog();
                   Ocho.Logging.log(data);
               },
               function (error) {
                   //Handle erors encounterd during read
                   console.log("Error reading file.")
               });
        }

    });
})();
