import Uppy = require('@lucidweb/uppy-core')
import CompanionClient = require('@lucidweb/uppy-companion-client')

declare module Facebook {
  interface FacebookOptions
    extends Uppy.PluginOptions,
      CompanionClient.PublicProviderOptions {
    replaceTargetContent?: boolean
    target?: Uppy.PluginTarget
    title?: string
    storage?: CompanionClient.TokenStorage
  }
}

declare class Facebook extends Uppy.Plugin<Facebook.FacebookOptions> {}

export = Facebook
