import http from "./httpService";

export function getPosts() {
    return http.get("/posts");
}

export function getPost(id) {
    return http.get(`/posts/${id}`);
}

export function savePost(post) {
    if (post.id) {
        const body = {...post};
        delete body.id;
        return http.put(`/posts/${post.id}`, body);
    }
    return http.post(`/posts`, post);
}

export function deletePost(id) {
    return http.delete(`/posts/${id}`);
}

