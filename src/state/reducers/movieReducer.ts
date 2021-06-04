import { ActionType } from '../action-types/movieActionTypes';
import { Action } from '../actions/movieActions';
import { Movie } from '../../services/movieService'

interface MovieState {
  movies: Movie[],
  selectedMovie?: Movie,
  loading: boolean,
  error: string | null
}

const initialState = {
  movies: [],
  loading: false,
  error: null
};

const reducer = (
  state: MovieState = initialState,
  action: Action
): MovieState => {
  switch (action.type) {
    case ActionType.MOVIE_LOADING:
      return {
        ...state,
        loading: true, error: null
      };
    case ActionType.MOVIE_ERROR:
      return {
        ...state,
        loading: false, error: action.payload
      };
    case ActionType.FETCH_MOVIES:
      return {
          ...state,
          movies: action.payload,
          loading: false, error: null
      };
    
    case ActionType.FETCH_MOVIE:
      return {
          ...state,
          selectedMovie: action.payload,
          loading: false, error: null
      };
    case ActionType.ADD_MOVIE:
      return {
          ...state,
          movies: [...state.movies, action.payload],
          loading: false, error: null
      };
    case ActionType.DELETE_MOVIE:
      return {
        ...state, 
          movies:  [...state.movies.filter(( movie ) => movie._id !== action.payload)],
          loading: false, error: null
      };
    
    case ActionType.UPDATE_MOVIE:
      let movies = [...state.movies];
      let index = movies.findIndex((movie => movie._id == action.payload._id));
      movies[index] = action.payload
      return {
        ...state,
        movies: movies,
        loading: false, error: null,
        selectedMovie: undefined
      };
    default:
        return state;
  }
};

export default reducer;

