import axios from "axios";

import authHeader from "./auth-header";

import http from "../http-common";

const API_URL = "http://localhost:3000/api/users/";

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAll = () => {
  return axios.get(API_URL + "all");
};

// const getAllFriends = () => {
//   return axios.get(API_URL + "/friends");
// };

const update = (id, data) => {
  return axios.post(API_URL + `${id}`, data);
};

// const update = (id, data) => {
//   return http.put(`/users/${id}`, data);
// };

const addfriend = (id, data) => {
  return axios.post(API_URL + `friends/${id}`, data);
};

const UserService = {
  getAdminBoard,
  update,
  getAll,
  addfriend,
};

export default UserService;
