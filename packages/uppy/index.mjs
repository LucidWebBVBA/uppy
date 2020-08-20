// Core
export { default as Core } from '@lucidweb/uppy-core'

// Utilities
export { default as server } from '@lucidweb/uppy-companion-client'
import ProviderView from '@lucidweb/uppy-provider-views'
export var views = { ProviderView: ProviderView }

// Stores
export { default as DefaultStore } from '@lucidweb/uppy-store-default'
export { default as ReduxStore } from '@lucidweb/uppy-store-redux'

// UI plugins
export { default as Dashboard } from '@lucidweb/uppy-dashboard'
export { default as DragDrop } from '@lucidweb/uppy-drag-drop'
export { default as FileInput } from '@lucidweb/uppy-file-input'
export { default as Informer } from '@lucidweb/uppy-informer'
export { default as ProgressBar } from '@lucidweb/uppy-progress-bar'
export { default as StatusBar } from '@lucidweb/uppy-status-bar'

// Acquirers
export { default as Dropbox } from '@lucidweb/uppy-dropbox'
export { default as GoogleDrive } from '@lucidweb/uppy-google-drive'
export { default as Instagram } from '@lucidweb/uppy-instagram'
export { default as OneDrive } from '@lucidweb/uppy-onedrive'
export { default as Facebook } from '@lucidweb/uppy-facebook'
export { default as Url } from '@lucidweb/uppy-url'
export { default as Webcam } from '@lucidweb/uppy-webcam'
export { default as ScreenCapture } from '@lucidweb/uppy-screen-capture'

// Uploaders
export { default as AwsS3 } from '@lucidweb/uppy-aws-s3'
export { default as AwsS3Multipart } from '@lucidweb/uppy-aws-s3-multipart'
export { default as Transloadit } from '@lucidweb/uppy-transloadit'
export { default as Tus } from '@lucidweb/uppy-tus'
export { default as XHRUpload } from '@lucidweb/uppy-xhr-upload'

// Miscellaneous
export { default as Form } from '@lucidweb/uppy-form'
export { default as GoldenRetriever } from '@lucidweb/uppy-golden-retriever'
export { default as ReduxDevTools } from '@lucidweb/uppy-redux-dev-tools'
export { default as ThumbnailGenerator } from '@lucidweb/uppy-thumbnail-generator'
