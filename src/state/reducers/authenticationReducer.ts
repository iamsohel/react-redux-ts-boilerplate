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
    case ActionTypes.STOP_AUTH_LOADING: {
      return {
          ...initialState,  loading: true //! mean true if it has value
      }
    }
    case ActionTypes.STOP_AUTH_LOADING: {
      return {
          ...initialState,  loading: false //! mean true if it has value
      }
    }

    case ActionTypes.SET_CURRENT_USER: {
      return {
          ...initialState, currentUser: action.payload, loggedIn: true, loading: false  //! mean true if it has value
      }
    }
    case ActionTypes.LOGOUT_USER: {
      return {
        ...initialState,
        loggedIn: false,
        currentUser: null
      };
    }

    default: {
      return initialState;
    }
  }
};

export default reducer;

