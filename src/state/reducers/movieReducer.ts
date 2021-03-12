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
      let allMovie = [...state.movies];
      return {
        movies: allMovie,  loading: true
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
    case ActionType.DELETE_MOVIE:
      console.log("delete", action.payload)
      let movies = [...state.movies];
      let allMovies = movies.filter(( obj ) => obj._id !== action.payload);
      console.log(allMovies)
      return {
          movies: allMovies,
          loading: false
      };
    default:
        return state;
  }
};

export default reducer;

