(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/ads/ads.html", {
        ready: function (element, options) {
            //initAdTypes();
        }
    });
    
    function initAdTypes() {
        var units = [
            { unit: 'Image_160x600' }, { unit: 'Image_250x250' }, { unit: 'Image_300x250' }, { unit: 'Image_300x600' },
            { unit: 'Image_320x480' }, { unit: 'Image_320x50' }, { unit: 'Image_728x90' }, { unit: 'ImageText_160x120' },
            { unit: 'ImageText_160x160' }, { unit: 'ImageText_250x250' }, { unit: 'ImageText_320x50' }, { unit: 'Text_300x250' },
            { unit: 'Text_320x250' }, { unit: 'Text_320x50' }, { unit: 'Video_300x250' }, { unit: 'Video_320x480' }
        ];

        units.forEach(function (u) {
            var adDiv = document.createElement("div");

            //make a label to go above each ad and add it to the DOM
            var adUnitIdDiv = document.createElement("div");
            adUnitIdDiv.innerText = u.unit;
            adDiv.appendChild(adUnitIdDiv);

            //create the ad and add it to the DOM
            adDiv.style.width = u.unit.match("_(\\d*)x")[1] + "px";
            adDiv.style.height = u.unit.match("x(\\d*)$")[1] + "px";
            q("#list").appendChild(adDiv);
            var ad = new MicrosoftNSJS.Advertising.AdControl(adDiv);
            ad.applicationId = '9d39ecda-af49-4715-ba31-5f32f89d39ecda-af49-4715-ba31-5f32f87022fb022fb';
            ad.adUnitId = u.unit;
        });
    }
})();
