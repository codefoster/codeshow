// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";
    var theData = [
        { title: "Lorem", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam neque tortor, egestas sit amet gravida id, viverra sit amet tellus. Nunc eget massa orci, quis interdum leo. Sed sit amet accumsan nibh. Suspendisse potenti. Sed ornare ultrices laoreet. Vestibulum eu velit sed leo dignissim tempus. Sed et ante ut erat ullamcorper pharetra nec sit amet nunc. In gravida magna in nisl tempus sagittis. Pellentesque vel euismod nunc. Praesent eget congue urna. Sed a ipsum sit amet ante adipiscing egestas. Nulla sed nisi id lacus auctor suscipit. Nam eleifend auctor facilisis. Phasellus massa nisi, interdum non vulputate volutpat, condimentum quis augue." },
        { title: "Morbi", content: "Morbi risus magna, sollicitudin nec mattis id, faucibus sed mauris. Phasellus lacinia turpis vel dolor sagittis volutpat. In vitae ipsum nunc, a pellentesque nunc. Donec blandit scelerisque nisi vitae sagittis. Ut eget lacus turpis, sit amet pellentesque est. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus eu elit vitae neque aliquam dictum at sit amet mi. Nam felis dui, aliquet vitae condimentum ullamcorper, bibendum suscipit mi. Nulla vel nulla eros, eget molestie quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam tellus, gravida sed auctor nec, porttitor ac sapien. Aenean a semper tellus." },
        { title: "Curabitur", content: "Curabitur volutpat feugiat tortor, nec hendrerit diam porta ac. Praesent volutpat aliquet leo, ut tempus quam pulvinar in. Nam egestas purus tincidunt mi ultrices sit amet tristique nunc sagittis. Quisque iaculis sem viverra purus congue vitae aliquet magna gravida. Maecenas ac augue a justo rutrum dapibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam erat volutpat. Sed egestas est auctor odio gravida a tincidunt nibh dignissim. Aenean condimentum congue cursus. Fusce varius mi ut lectus commodo facilisis." },
        { title: "Vestibulum", content: "Vestibulum hendrerit suscipit ante, nec vulputate mauris scelerisque nec. Curabitur elementum mattis convallis. Ut porttitor dui sodales urna ullamcorper a eleifend sapien mollis. Duis tincidunt pellentesque facilisis. Vestibulum vel tristique lorem. Nullam rhoncus, nunc sit amet tincidunt aliquet, erat justo porttitor tellus, at porta risus quam sit amet velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nulla justo, ultricies at adipiscing sit amet, lobortis at urna. Suspendisse ut magna risus, ac semper lacus. Nam sit amet tortor eu massa condimentum fermentum quis nec lectus. Cras nec nisl vitae arcu posuere lobortis accumsan vel neque. In commodo nunc lectus, eget imperdiet dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla convallis iaculis lacus, in eleifend ligula sodales at. Nam volutpat nisi quis metus convallis a cursus mi euismod. Proin sit amet leo arcu." },
        { title: "Nam", content: "Nam lorem nulla, rhoncus vel dapibus vitae, luctus ac tellus. Fusce placerat nunc at mi tempor pretium. Vivamus ullamcorper turpis metus, ut dapibus ante. Duis dictum nulla et tellus molestie a varius libero rhoncus. Nam tristique scelerisque adipiscing. Nulla facilisi. Suspendisse potenti. Curabitur eget ante quis elit facilisis pulvinar vel vel tortor. Phasellus nec leo id mi dapibus rhoncus. Nullam nec justo ac dui pulvinar ultricies ut ut lectus. Cras id dolor nec diam pharetra accumsan." },
        { title: "Maecenas", content: "Maecenas neque nisi, facilisis in pharetra at, consectetur sed odio. Mauris fringilla lorem et diam porttitor vehicula. Proin quis ante neque, et pellentesque enim. Fusce sed tortor nec felis tincidunt ornare. Pellentesque erat augue, ornare vitae iaculis id, tincidunt ac leo. Integer elit eros, hendrerit in interdum ac, vulputate ut lacus. Pellentesque nec odio turpis. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer suscipit dictum luctus. Pellentesque porttitor mattis magna, et consequat massa sollicitudin a. Praesent libero quam, iaculis vel pretium quis, consectetur in nulla. Vestibulum tempor velit quis urna gravida at vulputate erat tempus. Duis eu porta orci. Maecenas volutpat luctus magna. In hac habitasse platea dictumst." },
        { title: "Morbi", content: "Morbi dapibus consequat gravida. Sed eu eros id turpis ornare semper ac sit amet nulla. Suspendisse viverra imperdiet interdum. Morbi ipsum neque, tincidunt ut convallis fermentum, tristique vitae erat. Nunc vel nulla mi. Donec bibendum iaculis leo vitae tristique. Phasellus erat orci, cursus id condimentum ut, rhoncus sit amet enim. Suspendisse mattis auctor volutpat. Vestibulum id est orci. In nunc ligula, eleifend quis luctus placerat, congue eu metus. Phasellus nunc magna, viverra nec venenatis in, adipiscing at risus. Nullam mi purus, venenatis ut venenatis non, pellentesque sit amet orci. Etiam tempus ante quis odio dictum vel porta dolor viverra. Vivamus nec dolor sem." },
        { title: "Ut", content: "Ut hendrerit tempus lacus sagittis sodales. Vestibulum vulputate imperdiet arcu, sed cursus mi congue vel. Ut blandit imperdiet ante, rutrum pharetra nulla euismod vitae. Nulla facilisi. Aliquam sodales elementum ipsum, at mollis tortor feugiat non. Pellentesque condimentum leo tortor. Duis nibh neque, dignissim vel vestibulum quis, porttitor ac nisi. Donec auctor elementum condimentum." },
    ];
    var theList = new WinJS.Binding.List(theData);
    WinJS.Namespace.define("FlipViewDemo",
        { datalist: theList }
    );
}());
(function () {
    "use strict";

    WinJS.UI.Pages.define("/demos/flipview/flipview.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        }
    });
})();
