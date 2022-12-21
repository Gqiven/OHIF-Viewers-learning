import {
  ErrorBoundary,
  LoggerProvider,
  SnackbarProvider,
  DialogProvider,
  ModalProvider,
  OHIFModal
} from '@ohif/ui'
import {
  ServicesManager,
  LoggerService,
  UIDialogService,
  UIModalService
} from '@ohif/core'
import { Provider } from 'react-redux'
// import { OidcProvider } from 'redux-oidc'
import { AppProvider, useAppContext, CONTEXTS } from './context/AppContext'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'


const servicesManager = new ServicesManager()


class App extends Component {
  _appConfig
  constructor(props) {
    super(props)

    const { config, defaultExtensions } = props

    const appDefaultConfig = {
      showStudyList: true,
      cornerstoneExtensionConfig: {},
      extensions: [],
      routerBasename: '/'
    }

    this._appConfig = {
      ...appDefaultConfig,
      ...(typeof config === 'function' ? config({ servicesManager }) : config)
    }
  }
  render() {
    const { routerBasename } = this._appConfig
    const { UINotificationService } = servicesManager.services

    return (
      <ErrorBoundary context="App">
        <Provider store={store}>
          <AppProvider config={_appConfig}>
            <Router basename={routerBasename}>
              <LoggerProvider service={LoggerService}>
                <SnackbarProvider service={UINotificationService}>
                  <DialogProvider service={UIDialogService}>
                    <ModalProvider
                      modal={OHIFModal}
                      service={UIModalService}
                    >
                      <OHIFStandaloneViewer />
                    </ModalProvider>
                  </DialogProvider>
                </SnackbarProvider>
              </LoggerProvider>
            </Router>
          </AppProvider>
        </Provider>
      </ErrorBoundary>
    )
  }
}