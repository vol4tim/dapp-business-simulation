import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from '../shared/containers/app'
import NotFound from '../shared/components/app/notFound'
import { setRole } from '../modules/app/actions'
import { Start } from '../routes/start'
import * as Admin from '../routes/admin'
import * as User from '../routes/user'
import * as Dao from '../routes/dao'
import * as Log from '../routes/log'

export const routes = store =>
  (<div>
    <Route path="/" component={App}>
      <IndexRoute component={Start} />
      <Route path="/admin" component={Admin.Page} onEnter={() => { store.dispatch(setRole('admin')) }}>
        <IndexRoute component={Admin.Main} />
        <Route path="create/:type" component={Admin.Create} />
      </Route>
      <Route path="/user/:role" component={User.Page} onEnter={(nextState) => { store.dispatch(setRole(nextState.params.role)) }}>
        <IndexRoute component={User.Main} />
      </Route>
      <Route path="/dao" component={Dao.Page}>
        <Route path=":module/:address" component={Dao.Module} />
        <Route path=":module/:action/:address" component={Dao.Action} />
      </Route>
      <Route path="/log" component={Log.Page}>
        <IndexRoute component={Log.Main} />
      </Route>
    </Route>
    <Route path="*" component={NotFound} />
  </div>)
