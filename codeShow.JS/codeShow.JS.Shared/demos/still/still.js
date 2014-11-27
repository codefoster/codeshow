(function () {
	"use strict";

	WinJS.UI.Pages.define("/demos/still/still.html", {

		btn: null,
		photoStorage: null,
		video: null,
		btnPreview: null,
		img: null,
		mediaCaptureMgr: null,

		ready: function (element, options) {

			this.element = element;
			this.btn = element.querySelector("#captureButton");
			this.btnPreview = element.querySelector("#startButton");
			this.video = element.querySelector("#previewVideo");
			this.img = element.querySelector("#capturedImage");

			if (WinJS.Utilities.isPhone) {
				this.btnPreview.style.display = '';
				this.btn.disabled = true;
				this.btnPreview.disabled = false;
				this.video.style.display = '';
				this.img.style.display = 'none';
			}

			this.btnPreview.onclick = this.preview.bind(this);
			this.btn.onclick = this.takePhoto.bind(this);
		},
		error: function () {
			debugger;
		},
		fail: function () {
			debugger;
		},
		preview: function () {
			this.btn.disabled = false;
			this.btnPreview.disabled = true;
			this.img.style.display = 'none';
			this.video.style.display = '';

			thiscode.mediaCaptureMgr = new Windows.Media.Capture.MediaCapture();
			var captureInitSettings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
			captureInitSettings.audioDeviceId = "";
			captureInitSettings.videoDeviceId = "";
			captureInitSettings.photoCaptureSource = Windows.Media.Capture.PhotoCaptureSource.auto;
			captureInitSettings.streamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.audioAndVideo;

			this.mediaCaptureMgr.onfailed = this.fail.bind(this);

			this.mediaCaptureMgr.initializeAsync(captureInitSettings).then(function (result) {

				//mediaCaptureMgr.setPreviewRotation(Windows.Media.Capture.VideoRotation.clockwise90Degrees);
				this.video.src = URL.createObjectURL(this.mediaCaptureMgr, { oneTimeOnly: true });
				this.video.play();
			}.bind(this));
		},
		takePhoto: function () {
			if (WinJS.Utilities.isPhone) {
				this.btn.disabled = true;
				this.btnPreview.disabled = false;
				var photoStorage;
				Windows.Storage.KnownFolders.picturesLibrary.createFileAsync("photo.jpg", Windows.Storage.CreationCollisionOption.generateUniqueName).then(function (newFile) {

					photoStorage = newFile;
					var photoProperties = Windows.Media.MediaProperties.ImageEncodingProperties.createJpeg();

					// Capture the photo
					return this.mediaCaptureMgr.capturePhotoToStorageFileAsync(photoProperties, photoStorage);

				}.bind(this)).then(function (result) {

					var url = URL.createObjectURL(photoStorage, { oneTimeOnly: true });
					this.video.src = '';
					this.video.style.display = 'none';
					this.img.style.display = '';
					this.img.src = url;

					this.mediaCaptureMgr.close();
					this.mediaCaptureMgr = null;
				}.bind(this));
			}
			else {
				new Windows.Media.Capture.CameraCaptureUI().captureFileAsync(Windows.Media.Capture.CameraCaptureUIMode.photo)
					.done(function (file) {
						if (file)
							this.element.querySelector("#capturedImage").src = URL.createObjectURL(file);
					}.bind(this));
			}
		}
	});
})();
