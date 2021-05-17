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


export type Action =
  | MovieLoading
  | FetchMovie
  | FetchMovies
  | AddMovie
  | UpdateMovie
  | DeleteMovie;
