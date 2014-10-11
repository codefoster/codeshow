///<reference path="//Microsoft.WinJS.2.0/js/base.js"/>
///<reference path="//Microsoft.WinJS.2.0/js/ui.js"/>

(function () {
	"use strict";

	function getContributorDataAsync(c) {

		var httpclient = new Windows.Web.Http.HttpClient();
		var uri = new Windows.Foundation.Uri(Ocho.Utilities.format("http://www.twitter.com/{0}", c.twitterHandle));
		var request = new Windows.Web.Http.HttpRequestMessage(Windows.Web.Http.HttpMethod.get, uri);

		//BUG: not currently working... twitter does not return a real result (for phone)... other sites do... weird
		//https://support.twitter.com/articles/20169452-basic-mobile-twitter-com-troubleshooting#
		request.headers.userAgent.parseAdd('Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; Touch; rv:11.0) like Gecko');

		return httpclient.sendRequestAsync(request).then(function (response) {

			if (response.statusCode !== 200) 
				return; // what to do here?

			return response.content.readAsStringAsync();
		})
		.then(function (responseBodyAsText) {

			var r = document.createElement('div');
			var i = responseBodyAsText.indexOf('<body');
			var x = responseBodyAsText.substring(i).indexOf('>');
			var j = responseBodyAsText.indexOf('</body>');

			var html = responseBodyAsText.substring(i + x + 1, j);

			r.innerHTML = html;

			c.imageUrl = ""; //TODO: default to a blank man image
			c.name = "";
			c.bio = "";
			c.website = "";

			var selectors;


			//find profile image
			selectors = ["img.avatar.size73", ".ProfileAvatar-image"];
			selectors.forEach(function (s) {
				if (r.querySelector(s)) c.imageUrl = r.querySelector(s).src;
			});

			//find profile name
			selectors = ["h1.fullname", ".ProfileHeaderCard-nameLink"];
			selectors.forEach(function (s) {
				if (r.querySelector(s)) c.name = r.querySelector(s).innerText;
			});

			//find profile bio
			selectors = ["p.bio", ".ProfileHeaderCard-bio"];
			selectors.forEach(function (s) {
				if (r.querySelector(s)) c.bio = r.querySelector(s).innerText;
			});

			//find website
			selectors = [".url a", ".ProfileHeaderCard-urlText a"];
			selectors.forEach(function (s) {
				if (r.querySelector(s)) c.website = r.querySelector(s).title;
			});

			return c;
		});
	};

	WinJS.Namespace.define("Data", {
		contributors: new WinJS.Binding.List(),
		demos: new WinJS.Binding.List(),
		categories: new WinJS.Binding.List(),
		apps: new WinJS.Binding.List(),
		loaded: null,
		loadData: loadData,
	});

	function loadData() {
		Data.loaded = WinJS.Promise.join([
			loadContributors(),
			loadDemos(),
			//loadApps()
		]);
	}

	//read contributors from WAMS and fetch details from Twitter
	function loadContributors() {
		//TODO: offline the contributors in case there's no internet connection
		if (!app.isConnected) return; //return right away
		var start = new Date().getTime();
		return codeshowClient.getTable("contributors").read()
			.then(function (contributors) {
				return WinJS.Promise.join(contributors.map(function (c) {
					return getContributorDataAsync(c).then(function (cc) { Data.contributors.push(cc); });
				}));
			})
			.then(function () {
				//when all of the details for the contributors have been gathered then log the timing
				var now = new Date().getTime();
				console.info("Contributors loaded in " + ((now - start) / 1000) + " seconds");
			});
	}

	function loadApps() {
		return codeshowClient.getTable("apps").read()

			//get app details from their Store landing page
			.then(function (apps) {
				WinJS.Promise.join(apps.map(function (app) {
					return fetchAppDetails(app.appid);
				}))

						//record the apps in the Data namespace
						.then(function (appsWithDetails) {
							Data.apps = appsWithDetails;
						})

						//writes apps to local storage for offline scenario
						.then(function () {
							if (Data.apps.length > 0) {
								appdata.localFolder.createFileAsync("apps.json", Windows.Storage.CreationCollisionOption.replaceExisting)
									.then(function (file) {
										Windows.Storage.FileIO.writeTextAsync(file, JSON.stringify(Data.apps));
									});
							}
						});
			}, function (err) {
				//no internet so try to load from file
				if (err.message == "Unexpected connection failure.") {
					return appdata.localFolder.getFileAsync("apps.json")
						.then(function (file) { Windows.Storage.FileIO.readTextAsync(file); })
						.then(function (contents) {
							return JSON.parse(contents);
						});

				}
			});

		function fetchAppDetails(id) {
			var app = {};
			return WinJS.xhr({ url: Ocho.Utilities.format("http://apps.microsoft.com/windows/en-us/app/{0}", id), responseType: "document" })
				.then(function (result) {
					var d = result.response;
					var e; //TODO: do all of these like subcategory to be safe

					//developer name
					e = d.querySelector("meta[name='MS.CList.Dev.Name']");
					app.devname = (e ? e.content : "");

					//category
					e = d.querySelector("#CategoryText a.launchStoreCategory");
					app.category = (e ? e.innerText : "");

					//subcategory
					e = d.querySelector("#CategoryText a.launchStoreCategoryWSub");
					app.subcategory = (e ? e.innerText : "");

					//title
					e = d.querySelector("meta[property='og:title']");
					app.title = (e ? e.content : "");

					//image url
					e = d.querySelector("meta[property='og:image']");
					app.imageurl = (e ? e.content : "");

					//tile background color
					e = d.querySelector("#AppLogo .AppTileIcon");
					if (e) {
						var x = e.style.cssText.match(/background-color:\s?(.*);?$/)[1];
						app.tileBackgroundColor = x;
					}
					else app.tileBackgroundColor = "white";

					//description
					e = d.querySelector("#DescriptionText");
					app.description = (e ? e.innerHTML : "");

					//price
					e = d.querySelector("#Price");
					app.price = (e ? e.innerText : "");

					//screenshots
					app.screenshots = [];
					e = d.querySelector("#ScreenshotImageButtons .imageButton");
					if (e) e.forEach(function (b) {
						app.screenshots.push({ url: b.querySelector("img").src });
					});
				})
				.then(function () { return app; });
		}

	}

	//populate demos (from the package)
	function loadDemos() {
		var start = new Date().getTime();
		return pkg.installedLocation.getFolderAsync("demos")
			.then(function (demosFolder) { return demosFolder.getFoldersAsync(); })
			.then(function (demoFolders) {
				return WinJS.Promise.join(demoFolders.map(function (demoFolder) {
					//initialize and set defaults
					var demo = { name: demoFolder.displayName, enabled: true, suppressAppBar: false, group: 'Other' };

					return demoFolder.getFileAsync(demoFolder.displayName + ".json")
						.then(function (file) {
							//copy all properties from the json file to the demo object
							return Windows.Storage.FileIO.readTextAsync(file)
								.then(function (text) {
									try {
										var m = JSON.parse(text);
										for (var key in m)
											if (m.hasOwnProperty(key))
												demo[key] = m[key];
									}
									catch (error) {
										console.error(Ocho.Utilities.format("There was a problem reading and parsing the {}.json file", demoFolder.displayName));
									}
								}, function (err) { debugger; });
						}, function () { console.error(Ocho.Utilities.format("The demo in the folder /demos/{0} must have a meta file called {0}.json", demoFolder.displayName)); })
						.then(function () {
							if (demo.enabled) {
								Data.demos.push(demo);
								console.log(Ocho.Utilities.format("Loaded demo {0}", demo.name));
								if (demo.group && Data.categories.filter(function (i) { return i.group === demo.group; }).length === 0)
									Data.categories.push({ group: demo.group });
							}
						});
				}));
			})
			.then(function () {
				////required if we use the hacky approach to picking 10 demos for the front page
				//Data.demos.notifyReload();

				var now = new Date().getTime();
				console.info("Demos loaded in " + ((now - start) / 1000) + " seconds");
			});
	}

	function getMetadataAsync(d, folder) {
	}
})();
