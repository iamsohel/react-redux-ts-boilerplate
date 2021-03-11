import { ActionTypes } from '../action-types';
import { Action } from '../actions';

interface ErrorState {
    error: string | null
}

const initialState = {
    error: null
};

const errorReducer =  (state: ErrorState = initialState, action: Action): ErrorState => {
    switch (action.type) {
        case ActionTypes.SET_ERRORS: {
          return {
              ...state, error: action.payload
          }
        }
        case ActionTypes.CLEAR_ERRORS: {
          return {
            ...state,
            error:  null
          };
        }
        default: {
          return initialState;
        }
    }
}

export default errorReducer;
