// ===============================================================================
//  Microsoft patterns & practices
//  Hilo JS Guidance
// ===============================================================================
//  Copyright © Microsoft Corporation.  All rights reserved.
//  This code released under the terms of the 
//  Microsoft patterns & practices license (http://hilojs.codeplex.com/license)
// ===============================================================================

(function (global) {
    "use strict";

    // SpecRunner Constructor
    // ----------------------

    // This objects searches through the project folder, the specs folder,
    // and the specs helpers folder to find all available JavaScript files.
    // It inserts a script tag in to the DOM for each file it finds.
    //
    // The `options` parameter allows three options to be passed in:
    // * `specs`: the folder to search for `*spec.js` files
    // * `helpers`: a folder that contains helper objects and methods for the specs
    // * `src`: the folder that contains all fo the source files that will be tested

    function SpecRunner(options) {
        this.specFolder = options.specs || "specs";
        this.helperFolder = options.helpers || "specs/helpers";
        this.srcFolder = options.src || "src";
    }

    // SpecRunner Methods
    // ------------------

    var specRunnerMethods = {

        // We're using the [bdd syntax][1] for Mocha, and
        // using [Chai.js][2] for the `expect` style assertions.
        //
        // [1]: http://visionmedia.github.com/mocha/
        // [2]: http://chaijs.com/
        //
        configureMocha: function () {
            global.expect = chai.expect;
            global.mocha.setup("bdd");
        },

        // Run the specs for this system by finding all of the
        // needed .js files for the source code, the helper files,
        // and the specs. Inject a `<script>` tag in to the DOM
        // for each file that it finds, and then start the test
        // runner.
        run: function () {
            this.appFolder = Windows.ApplicationModel.Package.current.installedLocation;
            this.configureMocha();

            this.injectHelpers()
                .then(this.injectPageControls.bind(this))
                .then(this.injectSpecList.bind(this))
                .then(this.startTestHarness.bind(this))
                .done(null, this.triggerError.bind(this));
        },

        // If an error occurred, dispatch it so that the
        // app running the tests can handle it and show the
        // error message.
        triggerError: function (error) {
            this.dispatchEvent("error", error);
        },

        startTestHarness: function () {
            global.mocha.run();
        },

        // Locate the .js files for the application via
        // the `src` folder, and inject them in to the DOM
        injectPageControls: function () {
            return this.getFolder(this.srcFolder)
                .then(this.getJSFileNames.bind(this))
                .then(this.buildScriptTags.bind(this))
                .then(this.addScriptsToBody.bind(this));
        },

        // Locate the .js helper files from the `helpers`
        // folder and inject them in to the DOM
        injectHelpers: function () {
            return this.getFolder(this.helperFolder)
                .then(this.getJSFileNames.bind(this))
                .then(this.buildScriptTags.bind(this))
                .then(this.addScriptsToBody.bind(this));
        },

        // Location the *spec.js files for the specs that
        // test the application files, from the `specs`
        // folder and inject them in to the DOM
        injectSpecList: function () {
            return this.getFolder(this.specFolder)
                .then(this.getSpecFileNames.bind(this))
                .then(this.buildScriptTags.bind(this))
                .then(this.addScriptsToBody.bind(this));
        },

        // A recursive function that returns a [StorageFolder][3]
        // based on a `folder/name/` parameter. 
        //
        // Since the built in [getFolderAsync][4] method won't allow
        // a `/` in the folder to load, relative paths cannot
        // be loaded without recursion.
        //
        // [3]: http://msdn.microsoft.com/library/windows/apps/BR227230
        // [4]: http://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.storagefolder.getfolderasync.aspx
        //
        getFolder: function (folderName, parentFolder) {
            parentFolder = parentFolder || this.appFolder;

            var names = folderName.split("/");
            var name = names.shift();

            var folder = parentFolder.getFolderAsync(name);
            if (names.length === 0) {

                // Found the final folder. Return it.
                return folder;

            } else {

                // More folders to find. Recursively load them.
                var self = this;
                return folder.then(function (newParent) {
                    return self.getFolder(names.join("/"), newParent);
                });

            }
        },

        // Use a regex to find all *.js files in the specified folder,
        // including all sub-folders.
        getJSFileNames: function (folder) {
            var nameTest = /.*js$/;
            return this._buildFileListFromRegex(nameTest, folder);
        },

        // Use a regex to find all *spec.js files in the specified folder,
        // including all sub-folders.
        getSpecFileNames: function (folder) {
            var specTest = /spec.*js/i;
            return this._buildFileListFromRegex(specTest, folder);
        },

        // Build a `<script>` tag array from an array of [StorageFile][5]
        // objects.
        //
        // [5]: http://msdn.microsoft.com/en-us/library/windows/apps/windows.storage.storagefile.aspx
        buildScriptTags: function (fileList) {
            var appPath = this.appFolder.path;

            var specList = fileList.map(function (file) {
                var filePath = file.path.replace(appPath, "");
                var scriptEl = document.createElement("script");
                scriptEl.setAttribute("src", filePath);

                return scriptEl;
            });

            return WinJS.Promise.as(specList);
        },

        // Inject the `<script>` tag array, an array of DOM elements,
        // in to the DOM, at the bottom of the `<body>` tag.
        addScriptsToBody: function (scriptTags) {
            var body = document.querySelector("body");
            scriptTags.forEach(function (tag) {
                body.appendChild(tag);
            });

            return WinJS.Promise.as(true);
        },

        // Build a list of files from a folder, using the supplied
        // regex to determine if the file should be included in the
        // resulting list. Files are loaded from nested sub-folders,
        // ordered by file name.
        _buildFileListFromRegex: function (regEx, folder) {
            var fileQuery = folder.getFilesAsync(Windows.Storage.Search.CommonFileQuery.orderByName);

            return fileQuery.then(function (files) {
                var fileList = files.filter(function (file) {
                    return regEx.test(file.name);
                });
                return WinJS.Promise.as(fileList);
            });
        }
    };

    // Public API
    // ----------

    WinJS.Namespace.define("Hilo", {
        SpecRunner: WinJS.Class.mix(SpecRunner, specRunnerMethods, WinJS.Utilities.eventMixin)
    });
})(this);
