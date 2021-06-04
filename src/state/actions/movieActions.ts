import { ActionType } from '../action-types/movieActionTypes';
import { Movie } from '../../services/movieService';

interface MovieLoading {
  type: ActionType.MOVIE_LOADING;
}


interface FetchMovie {
  type: ActionType.FETCH_MOVIE;
  payload: any;
}

interface FetchMovies {
    type: ActionType.FETCH_MOVIES;
    payload: Movie[];
}

interface AddMovie {
    type: ActionType.ADD_MOVIE;
    payload: any;
}

interface UpdateMovie {
    type: ActionType.UPDATE_MOVIE;
    payload: any;
}

interface DeleteMovie {
    type: ActionType.DELETE_MOVIE;
    payload: string;
}

interface MovieError {
  type: ActionType.MOVIE_ERROR;
  payload: any;
}

interface ClearMovieError {
  type: ActionType.CLEAR_MOVIE_ERROR;
  payload: any;
}


export type Action =
  | MovieLoading
  | FetchMovie
  | FetchMovies
  | AddMovie
  | UpdateMovie
  | DeleteMovie
  | MovieError
  | ClearMovieError;
