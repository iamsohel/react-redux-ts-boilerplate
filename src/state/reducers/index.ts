import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import errorReducer from './errorReducer';

const reducers = combineReducers({
  authentication: authenticationReducer,
  errors: errorReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
