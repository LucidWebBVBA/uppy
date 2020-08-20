// Core
exports.Core = require('@lucidweb/uppy-core')
exports.debugLogger = exports.Core.debugLogger

// Utilities
exports.server = require('@lucidweb/uppy-companion-client')
exports.views = {
  ProviderView: require('@lucidweb/uppy-provider-views')
}

// Stores
exports.DefaultStore = require('@lucidweb/uppy-store-default')
exports.ReduxStore = require('@lucidweb/uppy-store-redux')

// UI plugins
exports.Dashboard = require('@lucidweb/uppy-dashboard')
exports.DragDrop = require('@lucidweb/uppy-drag-drop')
exports.FileInput = require('@lucidweb/uppy-file-input')
exports.Informer = require('@lucidweb/uppy-informer')
exports.ProgressBar = require('@lucidweb/uppy-progress-bar')
exports.StatusBar = require('@lucidweb/uppy-status-bar')

// Acquirers
exports.Dropbox = require('@lucidweb/uppy-dropbox')
exports.GoogleDrive = require('@lucidweb/uppy-google-drive')
exports.Instagram = require('@lucidweb/uppy-instagram')
exports.OneDrive = require('@lucidweb/uppy-onedrive')
exports.Facebook = require('@lucidweb/uppy-facebook')
exports.Url = require('@lucidweb/uppy-url')
exports.Webcam = require('@lucidweb/uppy-webcam')
exports.ScreenCapture = require('@lucidweb/uppy-screen-capture')

// Uploaders
exports.AwsS3 = require('@lucidweb/uppy-aws-s3')
exports.AwsS3Multipart = require('@lucidweb/uppy-aws-s3-multipart')
exports.Transloadit = require('@lucidweb/uppy-transloadit')
exports.Tus = require('@lucidweb/uppy-tus')
exports.XHRUpload = require('@lucidweb/uppy-xhr-upload')

// Miscellaneous
exports.Form = require('@lucidweb/uppy-form')
exports.GoldenRetriever = require('@lucidweb/uppy-golden-retriever')
exports.ReduxDevTools = require('@lucidweb/uppy-redux-dev-tools')
exports.ThumbnailGenerator = require('@lucidweb/uppy-thumbnail-generator')

exports.locales = {}
