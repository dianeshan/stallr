import axios from "axios";

import http from "../http-common";

import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/users/";

// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAll = () => {
  return axios.get(API_URL + "all");
};

const get = (id) => {
  return axios.get(API_URL + `${id}`);
};

const update = (id, data) => {
  console.log(data);
  return axios.put(API_URL + `${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

const UserService = {
  getAdminBoard,
  update,
  getAll,
  get,
};

export default UserService;
