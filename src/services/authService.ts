import jwt_decode from "jwt-decode";
import { LoginData } from './../../interfaces/index';
import axios from "axios";
import http from './httpService';

export async function login(data: LoginData) {
  const res = await http.post('/auth', data);
  localStorage.setItem('token', res.data);
  const decoded =  jwt_decode(res.data);
  console.log("decoded::", decoded)
  return decoded;
}

// export function register(user) {
//   return http.post('/users', user);
// }

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('current_user');
}

export function getCurrentUser() {
  try {
    const token = localStorage.getItem('token');
    if (token){
        const decoded =  jwt_decode(token);
        return decoded;
        //return JSON.parse(user);
    } else {
        return null;
    }
  } catch (ex) {
    return null;
  }
}

export function getToken() {
  return localStorage.getItem('token');
}

export const setAuthToken = (token: any) => {
  if(token){
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export default {
  logout,
  getCurrentUser,
  getToken,
  setAuthToken,
  login,
  //register
};
