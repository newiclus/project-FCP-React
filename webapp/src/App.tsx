import React, { lazy, Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Routes from './config/routes'
import PrivateRoute from './Auth/components/PrivateRoute'

const Login = lazy(() => import('./Auth/containers/Login'))
const Report = lazy(() => import('./Report/containers/UploadData'))
const Campaign = lazy(() => import('./Campaigns/containers/EditCampaign'))
const News = lazy(() => import('./News/containers/AddNews'))

const App = () => {
  return (
    <main>
      <Suspense fallback={<p>Cargando...</p>}>
        <Switch>
          <Redirect exact from="/" to={Routes.REPORT} />
          <Route exact path={Routes.LOGIN} component={() => <Login />} />
          <PrivateRoute exact path={Routes.REPORT} component={() => <Report />} />
          <PrivateRoute exact path={Routes.CAMPAIGN_EDIT} component={() => <Campaign />} />
          <PrivateRoute exact path={Routes.NEWS_ADD} component={() => <News />} />
        </Switch>
      </Suspense>
    </main>
  )
}

export default App
