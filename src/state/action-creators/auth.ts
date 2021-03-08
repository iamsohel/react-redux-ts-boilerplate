import { Dispatch } from 'redux';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { login } from '../../services/authService';

interface LoginInterface {
  email: string,
  password: string
}

 export const loginUser = (loginData: LoginInterface) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.STOP_AUTH_LOADING,
    });

    try {
      const res = await login(loginData)
      dispatch({
        type: ActionTypes.SET_CURRENT_USER,
        payload: res,
      });
      
    } catch (err) {
      dispatch({
        type: ActionTypes.SET_ERRORS,
        payload: err.message,
      });
     
    }
  };
};

