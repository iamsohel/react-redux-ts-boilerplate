import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useTypedSelector } from './hooks/useTypedSelector';
import DashboardLayout from './layouts/Dashboard';

interface ProtectedRouteProps {
    path: any;
    Component: any;
    exact?: any;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
    const { loggedIn} = useTypedSelector((state) => state.auth);
    const { path, Component, ...rest } = props;
    return (
        <Route
            {...rest}
            render={props => {
                if (!loggedIn) return <Redirect to={{
                    pathname : '/login',
                    state : {from : props.location}
                }
                }/>;
                return (
                    <DashboardLayout>
                        <Component {...props} />
                    </DashboardLayout>)
                }}
        />
    );
}

export default ProtectedRoute;