import { Dispatch } from 'redux';
import { ActionType } from '../action-types/movieActionTypes';
import { Action } from '../actions/movieActions';
import { Movie, getAllMovie, saveMovie } from '../../services/movieService';

interface AddMovieType {
    title: string,
    genreId: string,
    numberInStock: number,
    dailyRentalRate: number
}

export const getMovies = () => async (dispatch: Dispatch<Action>) =>{
    dispatch({
      type: ActionType.MOVIE_LOADING
    });
    // dispatch({
    //   type: ActionType.AUTH_LOADING,
    // });

       try {
        const res = await getAllMovie();
        dispatch({
            type: ActionType.FETCH_MOVIES,
            payload: res.data,
        });
      
    } catch (error) {
    //   dispatch({
    //     type: ActionType.SET_ERRORS,
    //     payload: error.response.data
    //   });
     
    }
};

export const addMovie = (movie: AddMovieType) => async (dispatch: Dispatch<Action>) =>{
    dispatch({
      type: ActionType.MOVIE_LOADING
    });
    // dispatch({
    //   type: ActionType.AUTH_LOADING,
    // });

       try {
           const res = await saveMovie(movie);
           console.log("movie add")
            dispatch({
                type: ActionType.ADD_MOVIE,
                payload: res.data,
            });
      
    } catch (error) {
    //   dispatch({
    //     type: ActionType.SET_ERRORS,
    //     payload: error.response.data
    //   });
     
    }
};



