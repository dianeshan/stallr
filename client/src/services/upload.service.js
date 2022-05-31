import axios from "axios";
const API_URL = "http://localhost:3000/api/uploads/";

const upload = (file, onUploadProgress) => {
  let formData = new FormData();

  formData.append("file", file);

  return axios.post(API_URL + "upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

const getFiles = () => {
  return axios.get(API_URL + "files");
};

// const getOneFile = (id) => {
//   return axios.get(API_URL + `${id}`);
// };

const AuthService = {
  upload,
  getFiles,
};

export default AuthService;
