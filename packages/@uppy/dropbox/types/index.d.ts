import Uppy = require('@lucidweb/uppy-core')
import CompanionClient = require('@lucidweb/uppy-companion-client')

declare module Dropbox {
  interface DropboxOptions
    extends Uppy.PluginOptions,
      CompanionClient.PublicProviderOptions {
    replaceTargetContent?: boolean
    target?: Uppy.PluginTarget
    title?: string
    storage?: CompanionClient.TokenStorage
  }
}

declare class Dropbox extends Uppy.Plugin<Dropbox.DropboxOptions> {}

export = Dropbox
