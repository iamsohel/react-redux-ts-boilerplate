import { ActionTypes } from '../action-types';

interface AuthLoading {
  type: ActionTypes.STOP_AUTH_LOADING;
}

interface StopAuthLoading {
  type: ActionTypes.STOP_AUTH_LOADING;
}

interface Login {
  type: ActionTypes.SET_CURRENT_USER;
  payload: any;
}

interface Logout {
  type: ActionTypes.LOGOUT_USER;
  payload: any;
}

interface SetError {
  type: ActionTypes.SET_ERRORS;
  payload: any;  
}

interface CLearError {
  type: ActionTypes.CLEAR_ERRORS;
  payload: any;
}


export type Action =
  | Login
  | AuthLoading
  | StopAuthLoading
  | Logout
  | SetError
  | CLearError;
