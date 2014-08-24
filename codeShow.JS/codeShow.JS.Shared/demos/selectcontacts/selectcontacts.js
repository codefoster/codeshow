(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/selectcontacts/selectcontacts.html", {
        ready: function (element, options) {
            var picker = Windows.ApplicationModel.Contacts.ContactPicker();
            picker.commitButtonText = "Select";
            picker.selectionMode = Windows.ApplicationModel.Contacts.ContactSelectionMode.fields;
            picker.desiredFieldsWithContactFieldType.append(Windows.ApplicationModel.Contacts.ContactFieldType.email);

            pickContacts.onclick = function () {
                picker.pickMultipleContactsAsync().done(function (contacts) {
                    contacts.forEach(function (contact) {
                        var results = element.querySelector("div.results");
                        results.innerHTML += contact.name + "<br/>";
                    });
                }, function (error) { debugger; });
            };
        }
    });
})();
