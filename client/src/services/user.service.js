import axios from "axios";

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

const update = (id, data) => {
  return axios.put(API_URL + `${id}`, JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};

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
