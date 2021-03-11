import { ActionType } from '../action-types/movieActionTypes';
import { Action } from '../actions/movieActions';
import { Movie } from '../../services/movieService'

interface MovieState {
  movies: Movie[],
  loading: boolean
}

const initialState = {
  movies: [],
  loading: false
};

const reducer = (
  state: MovieState = initialState,
  action: Action
): MovieState => {
  switch (action.type) {
    case ActionType.MOVIE_LOADING:
      return {
        movies: [],  loading: true
      };
    case ActionType.FETCH_MOVIES:
      return {
          ...state,
          movies: action.payload,
          loading: false
      };
    case ActionType.ADD_MOVIE:
      console.log("movie add2", action.payload)

      return {
          ...state,
          movies: [...state.movies, action.payload],
          loading: false
      };
    default:
        return state;
  }
};

export default reducer;

