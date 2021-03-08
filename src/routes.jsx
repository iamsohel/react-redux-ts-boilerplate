import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard';

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: lazy(() => import('./views/auth/Login'))
      },
      {
        path: '/auth/register',
        exact: true,
        component: lazy(() => import('./views/auth/register'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-404',
        exact: true,
        component: lazy(() => import('./views/error/notFound'))
      },
      {
        component: () => <Redirect to="/errors/error-404" />
      }
    ]
  },
  {
    route: '/',
    component: DashboardLayout,
    routes: [
      {
        path: '/',
        exact: true,
        component: lazy(() => import('./views/dashboard'))
      },
      {
        path: '/form/:id',
        exact: true,
        component: lazy(() => import('./views/dashboard/postForm'))
      },
      {
        path: '/',
        exact: true,
        component: () => <Redirect to="/" />
      },
      // {
      //   component: () => <Redirect to="/errors/error-404" />
      // }
    ]
  }
];

export default routes;
