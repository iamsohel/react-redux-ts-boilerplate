import React, { Suspense, lazy} from 'react'
import { Router, Switch, Route} from "react-router-dom";
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './state';

const Login =  lazy(() => import('./views/auth/Login'));
const Register =  lazy(() => import('./views/auth/register'));
const Dashboard =  lazy(() => import('./views/dashboard/dashboard'));
const Form =  lazy(() => import('./views/dashboard/postForm'))


//const history = createBrowserHistory();
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback="loading...">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/form/:id" component={Form} />
            <Route path="/" component={Dashboard} />
          </Switch>
      </Suspense>
    </Provider>
  );
}

export default App;
