import { ActionTypes } from '../action-types';
import { Action } from '../actions';

interface ErrorState {
    error: string | undefined
}

const initialState = {
    error: ''
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
            error: ''
          };
        }
        default: {
          return initialState;
        }
    }
}

export default errorReducer;
