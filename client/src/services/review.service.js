import axios from "axios";

const API_URL = "http://localhost:3000/api/reviews/";

const getAll = () => {
  return axios.get(API_URL);
};

const createReview = (data) => {
  console.log(data);
  return axios.post(API_URL, data);
};

const findOneReview = (id) => {
  return axios.get(API_URL + `${id}`);
};

const findUserReviews = (data) => {
  return axios.get(API_URL + "user-reviews", data);
};

const updateReview = (id, data) => {
  return axios.put(API_URL + `${id}`, data);
};

const deleteReview = (id) => {
  return axios.delete(API_URL + `${id}`);
};

const deleteAllReviews = () => {
  return axios.delete(API_URL);
};

const findAllPublishedReviews = () => {
  return axios.get(API_URL);
};

const ReviewService = {
  getAll,
  createReview,
  findOneReview,
  updateReview,
  deleteReview,
  deleteAllReviews,
  findAllPublishedReviews,
  findUserReviews,
};

export default ReviewService;
