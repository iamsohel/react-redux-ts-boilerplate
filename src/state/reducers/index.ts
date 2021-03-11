import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import errorReducer from './errorReducer';
import movieReducer from './movieReducer';

const reducers = combineReducers({
  auth: authenticationReducer,
  errors: errorReducer,
  movies: movieReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
