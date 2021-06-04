import React from 'react'
import './App.css';
import { Provider } from 'react-redux';
import { store } from './state';
import setTokenAlwaysToHeader from './utils/set-auth-token';
import Routes from './routes';

setTokenAlwaysToHeader();
export default function App() {
    return (
      <Provider store={store}>
          <Routes/>
      </Provider>
    );
}

