import Uppy = require('@lucidweb/uppy-core')
import CompanionClient = require('@lucidweb/uppy-companion-client')

declare module OneDrive {
  interface OneDriveOptions
    extends Uppy.PluginOptions,
      CompanionClient.PublicProviderOptions {
    replaceTargetContent?: boolean
    target?: Uppy.PluginTarget
    title?: string
    storage?: CompanionClient.TokenStorage
  }
}

declare class OneDrive extends Uppy.Plugin<OneDrive.OneDriveOptions> {}

export = OneDrive
