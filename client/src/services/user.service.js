import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/users/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const update = (id, data) => {
  return axios.put(API_URL + `${id}`, data);
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  update,
};

export default UserService;
