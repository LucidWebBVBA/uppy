const { Plugin } = require('@lucidweb/uppy-core')
const Translator = require('@lucidweb/uppy-utils/lib/Translator')
const toArray = require('@lucidweb/uppy-utils/lib/toArray')
const isDragDropSupported = require('@lucidweb/uppy-utils/lib/isDragDropSupported')
const getDroppedFiles = require('@lucidweb/uppy-utils/lib/getDroppedFiles')
const { h } = require('preact')

/**
 * Drag & Drop plugin
 *
 */
module.exports = class DragDrop extends Plugin {
  static VERSION = require('../package.json').version

  constructor(uppy, opts) {
    super(uppy, opts)
    this.type = 'acquirer'
    this.id = this.opts.id || 'DragDrop'
    this.title = 'Drag & Drop'

    this.defaultLocale = {
      strings: {
        dropHereOr: 'Drop files here or %{browse}',
        browse: 'browse'
      }
    }

    // Default options
    const defaultOpts = {
      target: null,
      inputName: 'files[]',
      width: '100%',
      height: '100%',
      note: null,
      fileType: 'video'
    }

    // Merge default options with the ones set by user
    this.opts = { ...defaultOpts, ...opts }

    // Check for browser dragDrop support
    this.isDragDropSupported = isDragDropSupported()
    this.removeDragOverClassTimeout = null

    this.i18nInit()

    // Bind `this` to class methods
    this.onInputChange = this.onInputChange.bind(this)
    this.handleDragOver = this.handleDragOver.bind(this)
    this.handleDragLeave = this.handleDragLeave.bind(this)
    this.handleDrop = this.handleDrop.bind(this)
    this.addFiles = this.addFiles.bind(this)
    this.resetFiles = this.resetFiles.bind(this)
    this.render = this.render.bind(this)
  }

  setOptions(newOpts) {
    super.setOptions(newOpts)
    this.i18nInit()
  }

  i18nInit() {
    this.translator = new Translator([this.defaultLocale, this.uppy.locale, this.opts.locale])
    this.i18n = this.translator.translate.bind(this.translator)
    this.i18nArray = this.translator.translateArray.bind(this.translator)
    this.setPluginState() // so that UI re-renders and we see the updated locale
  }

  addFiles(files) {
    const descriptors = files.map((file) => ({
      source: this.id,
      name: file.name,
      type: file.type,
      data: file,
      meta: {
        // path of the file relative to the ancestor directory the user selected.
        // e.g. 'docs/Old Prague/airbnb.pdf'
        relativePath: file.relativePath || null
      }
    }))

    try {
      this.uppy.addFiles(descriptors)
      this.setPluginState({ fileAdded: true })
    } catch (err) {
      this.uppy.log(err)
    }
  }

  resetFiles() {
    try {
      this.uppy.reset();
      this.setPluginState({ fileAdded: false })
    }
    catch (err) {
      this.uppy.log(err);
    }
  }

  onInputChange(event) {
    this.uppy.log('[DragDrop] Files selected through input')
    const files = toArray(event.target.files)
    this.addFiles(files)

    event.target.value = null
  }

  handleDrop(event, dropCategory) {
    event.preventDefault()
    event.stopPropagation()
    clearTimeout(this.removeDragOverClassTimeout)

    // 2. Remove dragover class
    this.setPluginState({ isDraggingOver: false })

    // 3. Add all dropped files
    this.uppy.log('[DragDrop] Files were dropped')
    const logDropError = (error) => {
      this.uppy.log(error, 'error')
    }
    getDroppedFiles(event.dataTransfer, { logDropError })
      .then((files) => this.addFiles(files))
  }

  handleDragOver(event) {
    event.preventDefault()
    event.stopPropagation()

    // 1. Add a small (+) icon on drop
    // (and prevent browsers from interpreting this as files being _moved_ into the browser, https://github.com/transloadit/uppy/issues/1978)
    event.dataTransfer.dropEffect = 'copy'

    clearTimeout(this.removeDragOverClassTimeout)
    this.setPluginState({ isDraggingOver: true })
  }

  handleDragLeave(event) {
    event.preventDefault()
    event.stopPropagation()

    clearTimeout(this.removeDragOverClassTimeout)
    // Timeout against flickering, this solution is taken from drag-drop library. Solution with 'pointer-events: none' didn't work across browsers.
    this.removeDragOverClassTimeout = setTimeout(() => {
      this.setPluginState({ isDraggingOver: false })
    }, 50)
  }

  renderHiddenFileInput() {
    const restrictions = this.uppy.opts.restrictions
    return (
      <input
        class="uppy-DragDrop-input"
        type="file"
        hidden
        ref={(ref) => { this.fileInputRef = ref }}
        name={this.opts.inputName}
        multiple={restrictions.maxNumberOfFiles !== 1}
        accept={restrictions.allowedFileTypes}
        onchange={this.onInputChange}
      />
    )
  }

  renderArrowSvg() {
    return (
      <span id='upload-icon' class={`
        ${this.getPluginState().fileAdded ? 'icon-arrow-up' : 'icon-upload'}
        text-6xl
        text-gray-300
        ml-1
        mt-4
      `}/>
    )
  }

  renderLabel() {
    return (
      <div
        class="
          text-base
          text-gray-300
          flex
          flex-col
          font-basenormal
          items-center
      ">
        {
          this.getPluginState().fileAdded
            ? <span class='my-8'>
                Selected file:
                <p
                  class=''
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    maxWidth:'250px'
                  }}>
                {this.uppy.getFiles()[0].data.name /** @NOTE: data.name gives us the original filename, not the one generated with the timestamp */ }
                </p>
              </span>
            : <div class='flex flex-col'>
              <span class="mt-5">{this.i18n('dropHereOr')}</span>
              <span class="mt-5">OR</span>
            </div>
        }

        <div id='upload-btns' class="flex">
          <button
            class="
              a-button
              -secondary
              h-button-sm
              min-w-button-sm
              mt-5"
            disabled={this.getPluginState().fileAdded}
            style={{ maxWidth: "150px" }}
            type="button">
            {this.i18n('browse')}
          </button>
          {
            this.getPluginState().fileAdded
              ? <button
                  id='reset-button'
                  class="
                    a-button
                    -secondary
                    h-button-sm
                    min-w-button-sm
                    mt-5
                    ml-5
                  "
                  style={{ maxWidth: "150px" }}
                  type="button"
                  onClick={this.resetFiles}>
                    Change File
                </button>
              : ''
          }
        </div>
      </div>
    )
  }

  renderNote() {
    const defaultNoteVideo = (
      <span>
        For the best possible experience, the preferred
        video container format should be  <span class="font-basebold">.mp4</span>  encoded in <span class="font-basebold">H.264</span>.
        Other formats may not be compatible with the browser.
      </span>);
    const defaultNoteImage = (
      <span>
        For the best possible experience, your image format should be <span class="font-basebold">.png or .jpg</span>.
        Other formats may not be compatible with the browser.
      </span>
    )
    // const defaultNoteLogo = (
    //   <span>
    //     For the best possible experience, your image format should be <span class="font-basebold">.png or .jpg</span> with dimensions of 150x150 pixels max.
    //     Other formats may not be compatible with the browser.
    //   </span>
    // )
    const defaultNoteAudio = (
      <span>
        For the best possible experience, your audio format should be <span class="font-basebold">.mp3 or .wav</span>.
        Other formats may not be compatible with the browser.
      </span>
    )
    const fileTypes = {
      "videos": defaultNoteVideo,
      "images": defaultNoteImage,
      // "logos": defaultNoteLogo, @TODO: implement way to differenciate 360/2Dpics and logos (much smaller)
      "audios": defaultNoteAudio,
    }
    const defaultNote = fileTypes[this.opts.fileType];
    const note = this.opts.note ? this.opts.note : defaultNote;

    return (
      <div class="
        uppy-DragDrop-note
        text-base
        font-basenormal
        text-gray-300
        text-center
        container
        mt-5"
        style={{ maxWidth: "380px" }}>
        {note}
      </div>
    )
  }

  render(state) {
    const dragDropClass = `uppy-Root
      uppy-u-reset
      uppy-DragDrop-container
      border-none
      bg-gray-800
      rounded-none
      ${this.isDragDropSupported ? 'uppy-DragDrop--isDragDropSupported' : ''}
      ${this.getPluginState().isDraggingOver ? 'uppy-DragDrop--isDraggingOver' : ''}
      w-full
      py-6
    `

    const dragDropStyle = {
      width: this.opts.width,
      height: this.opts.height
    }

    return (
      <button
        type="button"
        class={dragDropClass}
        style={dragDropStyle}
        onClick={() => this.fileInputRef.click()}
        onDragOver={this.handleDragOver}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
      >
        {this.renderHiddenFileInput()}
        <div class="uppy-DragDrop-inner">
          {this.renderArrowSvg()}
          {this.renderLabel()}
          {this.renderNote()}
        </div>
      </button>
    )
  }

  install() {
    this.setPluginState({
      isDraggingOver: false, fileAdded: false
    })
    const target = this.opts.target
    if (target) {
      this.mount(target, this)
    }
  }

  uninstall() {
    this.unmount()
  }
}
