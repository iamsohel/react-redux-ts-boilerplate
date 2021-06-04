import { Dispatch } from 'redux';
import { ActionTypes } from '../action-types';
import { Action } from '../actions';
import { login, logout, setAuthToken } from '../../services/authService';

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
      window.location.href = "/movies"
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

export const logoutUser = (history: any) => (dispatch: Dispatch<Action>) => {
 
  logout();
  //remove auth header for future request
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  //history.push('/login');
  window.location.href = "/login"
}

