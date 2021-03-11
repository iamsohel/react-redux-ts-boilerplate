import React, { Suspense, lazy} from 'react'
import { Router, Switch, Route} from "react-router-dom";
import './App.css';
import { Provider } from 'react-redux';
import { store } from './state';
import setTokenAlwaysToHeader from './utils/set-auth-token';

const Login =  lazy(() => import('./views/auth/Login'));
const Register =  lazy(() => import('./views/auth/register'));
const Dashboard =  lazy(() => import('./views/dashboard/dashboard'));
const MovieUpdate = lazy(() => import('./views/dashboard/postForm'))
const MovieCreate = lazy(() => import('./views/movies/movieCreate'))
const Movies =  lazy(() => import('./views/movies/movieList'))


//const history = createBrowserHistory();
setTokenAlwaysToHeader();
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback="loading...">
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/movie/update/:id" component={MovieUpdate} />
            <Route path="/movie/create" component={MovieCreate} />
            <Route path="/movies" component={Movies} />
            <Route path="/" component={Dashboard} />
          </Switch>
      </Suspense>
    </Provider>
  );
}

export default App;
