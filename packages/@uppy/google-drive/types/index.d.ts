import Uppy = require('@lucidweb/uppy-core')
import CompanionClient = require('@lucidweb/uppy-companion-client')

declare module GoogleDrive {
  interface GoogleDriveOptions
    extends Uppy.PluginOptions,
      CompanionClient.PublicProviderOptions {
    replaceTargetContent?: boolean
    target?: Uppy.PluginTarget
    title?: string
    storage?: CompanionClient.TokenStorage
  }
}

declare class GoogleDrive extends Uppy.Plugin<GoogleDrive.GoogleDriveOptions> {}

export = GoogleDrive
