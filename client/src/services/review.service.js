import axios from "axios";

import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/api/reviews/";

const getAll = () => {
    return axios.get(API_URL);
};

const createReview = (toiletLocation, review, rating, photos) => {
    return axios.post(API_URL + "createReview", {
      toiletLocation,
      review,
      rating,
      photos
    });
  };


const ReviewService = {
  getAll,
  createReview
};

export default ReviewService;