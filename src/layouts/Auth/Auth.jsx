import React, { lazy, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import {Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/register'));

const Auth = props => {
    const { route } = props;
    console.log("Auth Layout::: ", route);
    return (
        <Container>
            <Suspense fallback="loading...">
                {/* {renderRoutes(route.routes)} */}
                <Switch>
                    <Route exact path="/auth/login" component={Login} /> 
                    <Route path="/auth/register" component={Register} />
                </Switch>
            </Suspense>
        </Container>
    );
};

export default Auth;
