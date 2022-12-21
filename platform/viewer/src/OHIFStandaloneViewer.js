import { Component } from 'react'
import { withRouter } from 'react-router'
import { Switch } from 'react-router-dom'
import { ViewerbaseDragDropContext, asyncComponent } from '@ohif/ui'
import { connect } from 'react-redux'
import { SignoutCallbackComponent } from 'redux-oidc'
import * as RoutesUtil from './routes/routesUtil'

const CallbackPage = asyncComponent(() => 
  retryImport(() => import)
)

class OHIFStandaloneViewer extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/silent-refresh.html"
          onEnter={RoutesUtil.reload}
        />
        <Route
          exact
          path="logout-redirect"
          render={() => (
            <SignoutCallbackComponent
              userManager={userManager}
              successCallback={() => console.log('Signout successful')}
              errorCallback={error => {
                console.warn(error)
                console.warn('Signout failed')
              }}
            />
          )}
        />
        <Route
          path="callback"
          render={() => <CallbackPage userManager={userManager} />}
        />
      </Switch>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.oidc.user
  }
}

const ConnectedOHIFStandaloneViewer = connect(
  mapStateToProps,
  null
)(OHIFStandaloneViewer)

export default ViewerbaseDragDropContext(
  withRouter(ConnectedOHIFStandaloneViewer)
)