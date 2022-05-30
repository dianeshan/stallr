import axios from "axios";

const API_URL = "http://localhost:3000/api/reviews/";

const getAll = () => {
    return axios.get(API_URL);
};

const createReview = (toiletLocation, review, rating, photos) => {
    return axios.post(API_URL, {
      toiletLocation,
      review,
      rating,
      photos
    });
};

const findOneReview = (id) => {
    return axios.get(API_URL, {
        id
    });
};

const updateReview = (toiletLocation, review, rating, photos) => {
    return axios.put(API_URL, {
      toiletLocation,
      review,
      rating,
      photos
    });
};

const deleteReview = (id) => {
    return axios.delete(API_URL, {
        id
    }); 
}

const deleteAllReviews = () => {
    return axios.delete(API_URL);
}

const findAllPublishedReviews = () => {
    return axios.get(API_URL);
}

const ReviewService = {
  getAll,
  createReview,
  findOneReview,
  updateReview,
  deleteReview,
  deleteAllReviews,
  findAllPublishedReviews
};


export default ReviewService;