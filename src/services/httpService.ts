import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const token = 'abc';
axios.defaults.headers.common["Authorization"] = 'Bearer ' + token;
// axios.interceptors.response.use(null, error => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     console.log(error);
//   }

//   return Promise.reject(error);
// });

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};