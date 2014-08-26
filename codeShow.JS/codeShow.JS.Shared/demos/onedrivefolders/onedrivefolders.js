(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/onedrivefolders/onedrivefolders.html", {
        ready: function (element, options) {
            WL.init();

            // 'wl.skydrive' gives access to OneDrive but not write permissions
            // so 'wl.skydrive_update' has been used
            WL.login({ scope: "wl.skydrive_update" });

            getfoldersbtn.addEventListener("click", getListOfFolders);
        }
    });
})();

function getListOfFolders() {

    if (!WL.getSession()) {
        folderStatus.innerText = "Not logged in";
        return;
    }

    folderStatus.innerText = "Please wait...";

    // path 'me' gets the basic info of the user such as name and profile picture
    // path 'me/skydrive' returns the properties of onedrive folder
    // path 'me/skydrive/files' returns all the files+folders+albums in onedrive folder
    // if you want to fetch any folder other than root folder, you need to have its id which looks like "folder.abcd1234def48shio.ABCD1234DEF48SHIO!987"
    WL.api({
        path: "me/skydrive/files?filter=folders,albums",
        method: "GET"
    }).then(
        function (response) {
            folderList.innerHTML = "";

            // response.data depends on the call supplied to onedrive
            // in this case it will be an array of all folders
            response.data.forEach(function (directory) {
                var l = document.createElement("li");
                l.innerText = directory.name;
                folderList.appendChild(l);
            });

            folderStatus.innerText = "Retrieved " + response.data.length + " folders+albums";
        },
        function (response_error) {
            folderStatus.innerText = "Something went wrong!";
        }
    );}
