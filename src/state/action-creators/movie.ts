import { Dispatch } from 'redux';
import { ActionType } from '../action-types/movieActionTypes';
import { Action } from '../actions/movieActions';
import { Movie, getAllMovie, saveMovie, removeMovie, getMovie } from '../../services/movieService';

interface AddMovieType {
    title: string,
    genreId: string,
    numberInStock: number,
    dailyRentalRate: number,
    _id? : string
}

export const getMovies = () => async (dispatch: Dispatch<Action>) =>{
    dispatch({
      type: ActionType.MOVIE_LOADING
    });
    try {
        const res = await getAllMovie();
        dispatch({
            type: ActionType.FETCH_MOVIES,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: ActionType.MOVIE_ERROR,
            payload: error.response.data
          });
     
    }
};

export const getAMovie = (id: string) => async (dispatch: Dispatch<Action>) =>{
    dispatch({
      type: ActionType.MOVIE_LOADING
    });
    try {
        const res = await getMovie(id);
        dispatch({
            type: ActionType.FETCH_MOVIE,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: ActionType.MOVIE_ERROR,
            payload: error.response.data
          });
     
    }
};

export const addMovie = (movie: AddMovieType, history:any) => async (dispatch: Dispatch<Action>) =>{
    dispatch({
      type: ActionType.MOVIE_LOADING
    });
    try {
        const res = await saveMovie(movie);
        console.log("movie add")
        dispatch({
            type: ActionType.ADD_MOVIE,
            payload: res.data,
        });
        history.push("/movies");
    } catch (error) {
        dispatch({
            type: ActionType.MOVIE_ERROR,
            payload: error.response.data
          });
     
    }
};

export const deleteMovie = (id: string) => async (dispatch: Dispatch<Action>) =>{
    // dispatch({
    //     type: ActionType.MOVIE_LOADING
    // });
    try {
        const res = await removeMovie(id);
        dispatch({
            type: ActionType.DELETE_MOVIE,
            payload: id,
        });
    } catch (error) {
        dispatch({
            type: ActionType.MOVIE_ERROR,
            payload: error.response.data
        });
    }
};

export const editMovie = (data: AddMovieType, history: any) => async (dispatch: Dispatch<Action>) =>{
    dispatch({
        type: ActionType.MOVIE_LOADING
    });
    try {
        const res = await saveMovie(data);
        dispatch({
            type: ActionType.UPDATE_MOVIE,
            payload: res.data,
        });
        history.push('/movies')
    } catch (error) {
        console.log("error", error.response.data)
      dispatch({
        type: ActionType.MOVIE_ERROR,
        payload: error.response.data
      });
    }
};



