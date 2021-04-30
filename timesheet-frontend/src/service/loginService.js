import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "http://localhost:3001/" + "account/";

const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password) {
  console.log("login function in service");
  const { data: jwt } = await http.post(apiEndpoint + "login", {
    username,
    password,
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  const respond = await http.get(apiEndpoint + "logout");
  console.log("Logout" + respond);
  localStorage.clear();
}

export function getCurrentAccount() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentAccount,
  getJwt,
};
