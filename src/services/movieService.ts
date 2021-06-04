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
    if (movie._id) {
        const body = {...movie};
        delete body._id;
        return http.put(`/movies/${movie._id}`, body);
    }
    return http.post(`/movies`, movie);
}

export function removeMovie(id: string) {
    return http.delete(`/moviess/${id}`);
}

  