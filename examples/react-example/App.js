/* eslint-disable */
const React = require('react')
const Uppy = require('@uppy/core')
const Tus = require('@uppy/tus')
const GoogleDrive = require('@uppy/google-drive')
const { Dashboard, DashboardModal, DragDrop, ProgressBar, StatusBar } = require('@uppy/react')

module.exports = class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      showInlineDashboard: false,
      open: false
    }

    this.uppy = new Uppy({ id: 'uppy1', autoProceed: false, debug: true, onBeforeUpload: (files) => console.log(files) })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })
      .use(GoogleDrive, { companionUrl: 'https://companion.uppy.io' })

    this.uppy2 = new Uppy({ id: 'uppy2', autoProceed: false, debug: true })
      .use(Tus, { endpoint: 'https://master.tus.io/files/' })

    this.handleModalClick = this.handleModalClick.bind(this)
  }

  componentWillUnmount() {
    this.uppy.close()
    this.uppy2.close()
  }

  handleModalClick() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { showInlineDashboard } = this.state
    return (
      <div className="container">
        <div className="bg-primary">
          <h1 className="bg-gray-200">React Examples</h1>

          <h2>Inline Dashboard</h2>
          <label>
            <input
              type="checkbox"
              checked={showInlineDashboard}
              onChange={(event) => {
                this.setState({
                  showInlineDashboard: event.target.checked
                })
              }}
            />
          Show Dashboard
        </label>
          {showInlineDashboard && (
            <Dashboard
              uppy={this.uppy}
              plugins={['GoogleDrive']}
              metaFields={[
                { id: 'name', name: 'Name', placeholder: 'File name' }
              ]}
            />
          )}

          <h2>Modal Dashboard</h2>
          <div>
            <button onClick={this.handleModalClick}>
              {this.state.open ? 'Close dashboard' : 'Open dashboard'}
            </button>
            <DashboardModal
              uppy={this.uppy2}
              open={this.state.open}
              target={document.body}
              onRequestClose={() => this.setState({ open: false })}
            />
          </div>

          <h2 className="bg-gray-600">Drag Drop Area</h2>
          {/* get rid of border on dragdrop */}
          <div className="border border-gray-600">
            <DragDrop
              uppy={this.uppy}
              fileType="video"
              locale={{
                strings: {
                  dropHereOr: 'DRAG AND DROP TO UPLOAD',
                  browse: 'upload',
                }
              }}
            />

            <StatusBar
              uppy={this.uppy}
              hideAfterFinish={false}
              hideUploadButton={false}
              showProgressDetails
            />
          </div>
        </div>
      </div>
    )
  }
}
