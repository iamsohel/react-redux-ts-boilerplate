import { ActionTypes } from '../action-types';
import { Action } from '../actions';

interface AuthenticationState {
  loggedIn: boolean,
  currentUser: any,
  loading: boolean
}

const initialState = {
  loggedIn: false,
  currentUser: {},
  loading: false
};

const reducer = (
  state: AuthenticationState = initialState,
  action: Action
): AuthenticationState => {
  switch (action.type) {
    case ActionTypes.AUTH_LOADING: {
      return {
          ...state,  loading: true //! mean true if it has value
      }
    }
    
    case ActionTypes.SET_CURRENT_USER: {
      return {
          ...state, currentUser: action.payload, loggedIn: true, loading: false  //! mean true if it has value
      }
    }
    case ActionTypes.LOGOUT_USER: {
      return {
        ...state,
        loggedIn: false,
        currentUser: null
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;

