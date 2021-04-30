import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "http://localhost:3001/" + "account/";

const tokenKey = "token";
http.setJwt(getJwt());
export async function register(username, email, password, account_type) {
  const { data: jwt } = await http.post(apiEndpoint + "register", {
    username,
    email,
    password,
    account_type,
  });
  localStorage.setItem(tokenKey, jwt);
}
export function RegisterWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  register,
  getJwt,
};
