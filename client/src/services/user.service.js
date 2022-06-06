import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/users/";

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getAll = () => {
  return axios.get(API_URL + "all");
};

const update = (id, data) => {
  return axios.put(API_URL + `${id}`, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};

const getUser = (id) => {
  return axios.get(API_URL + `${id}`);
};

const addfriend = (id, data) => {
  return axios.post(API_URL + `friends/${id}`, data);
};

const UserService = {
  getAdminBoard,
  update,
  getAll,
  getUser,
  addfriend,
};

export default UserService;
