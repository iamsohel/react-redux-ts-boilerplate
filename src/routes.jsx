import React, { lazy, Suspense } from 'react';
import {Switch, Route} from "react-router-dom";
import ProtectedRoute from './protectedRoute';

const Login =  lazy(() => import('./views/auth/Login'));
const Register =  lazy(() => import('./views/auth/register'));
const Dashboard =  lazy(() => import('./views/dashboard/dashboard'));
const MovieUpdate = lazy(() => import('./views/movies/movieUpdate'))
const MovieCreate = lazy(() => import('./views/movies/movieCreate'))
const Movies =  lazy(() => import('./views/movies/movieList'))

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <ProtectedRoute exact path="/" Component={Movies} />
        <ProtectedRoute path="/movie/update/:id" Component={MovieUpdate} />
        <ProtectedRoute path="/movie/create" Component={MovieCreate} />
        <ProtectedRoute path="/movies" Component={Movies} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Suspense>
  );
}
export default Routes;