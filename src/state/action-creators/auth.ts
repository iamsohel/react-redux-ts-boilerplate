import { Dispatch } from 'redux';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { login } from '../../services/authService';

interface LoginInterface {
  email: string,
  password: string
}

 export const loginUser = (loginData: LoginInterface) => async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.CLEAR_ERRORS
    });
    dispatch({
      type: ActionTypes.AUTH_LOADING,
    });

    try {
      const res = await login(loginData)
      dispatch({
        type: ActionTypes.SET_CURRENT_USER,
        payload: res,
      });
      
    } catch (error) {
      dispatch({
        type: ActionTypes.SET_ERRORS,
        payload: error.response.data
      });
     
    }
};

export const setCurrentUser = (currentUser: any) => {
  return {
      type: ActionTypes.SET_CURRENT_USER,
      payload: currentUser
  }
};

