import http from "./httpService";

export interface Movie {
    _id: string,
    title: string,
    genre: {
        _id: string,
        name: string
    },
    dailyRentalRate: number,
    numberInStock: number
    __v: number
}

export function getAllMovie() {
    return http.get("/movies");
}

export function getMovie(id: string) {
    return http.get(`/movies/${id}`);
}

export function saveMovie(movie: any) {
    if (movie.id) {
        const body = {...movie};
        delete body.id;
        return http.put(`/movies/${movie.id}`, body);
    }
    return http.post(`/movies`, movie);
}

export function removeMovie(id: string) {
    return http.delete(`/movies/${id}`);
}

// export default {
//     getAllMovie,
//     removeMovie,
//     saveMovie
//   };
  