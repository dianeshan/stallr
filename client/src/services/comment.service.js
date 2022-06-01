import axios from "axios";

const API_URL = "http://localhost:3000/api/comments/";

const createComment = (data) => {
    console.log(data);
    return axios.post(API_URL, data);
};

const deleteComment = (id) => {
    return axios.delete(API_URL + `${id}`);
};

const CommentService = {
    createComment,
    deleteComment,
};

export default CommentService;