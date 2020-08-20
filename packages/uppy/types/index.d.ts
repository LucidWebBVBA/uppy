// Type definitions for uppy
// Project: https://uppy.io
// Definitions by: taoqf <https://github.com/taoqf>

// Core
import Core = require('@lucidweb/uppy-core');
export { Core };

// Stores
import DefaultStore = require('@lucidweb/uppy-store-default');
export { DefaultStore };
import ReduxStore = require('@lucidweb/uppy-store-redux');
export { ReduxStore };

// UI plugins
import Dashboard = require('@lucidweb/uppy-dashboard');
export { Dashboard };
import DragDrop = require('@lucidweb/uppy-drag-drop');
export { DragDrop };
import FileInput = require('@lucidweb/uppy-file-input');
export { FileInput };
import Informer = require('@lucidweb/uppy-informer');
export { Informer };
import ProgressBar = require('@lucidweb/uppy-progress-bar');
export { ProgressBar };
import StatusBar = require('@lucidweb/uppy-status-bar');
export { StatusBar };

// Acquirers
import Dropbox = require('@lucidweb/uppy-dropbox');
export { Dropbox };
import GoogleDrive = require('@lucidweb/uppy-google-drive');
export { GoogleDrive };
import Instagram = require('@lucidweb/uppy-instagram');
export { Instagram };
import Url = require('@lucidweb/uppy-url');
export { Url };
import Webcam = require('@lucidweb/uppy-webcam');
export { Webcam };
import ScreenCapture = require('@lucidweb/uppy-screen-capture');
export { ScreenCapture };

// Uploaders
import AwsS3 = require('@lucidweb/uppy-aws-s3');
export { AwsS3 };
import AwsS3Multipart = require('@lucidweb/uppy-aws-s3-multipart');
export { AwsS3Multipart };
import Transloadit = require('@lucidweb/uppy-transloadit');
export { Transloadit };
import Tus = require('@lucidweb/uppy-tus');
export { Tus };
import XHRUpload = require('@lucidweb/uppy-xhr-upload');
export { XHRUpload };

// Miscellaneous
import Form = require('@lucidweb/uppy-form');
export { Form };
import GoldenRetriever = require('@lucidweb/uppy-golden-retriever');
export { GoldenRetriever };
import ReduxDevTools = require('@lucidweb/uppy-redux-dev-tools');
export { ReduxDevTools };
import ThumbnailGenerator = require('@lucidweb/uppy-thumbnail-generator');
export { ThumbnailGenerator };
