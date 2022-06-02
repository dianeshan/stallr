import React, { useState, useEffect } from "react";
import { Container, Modal, Button } from "react-bootstrap";

import ReviewService from "../services/review.service";
import AuthService from "../services/auth.service";
import Review from "./Review";
import NewReview from "./NewReview";

const Home = () => {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    retrieveReviews();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const setActiveReview = (user, index) => {
    setCurrentIndex(index);
  };

  const retrieveReviews = () => {
    ReviewService.getAll()
      .then((response) => {
        setReviews(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container className="pt-4">
      {currentUser && (
        <div className="centered">
          <Button variant="info" onClick={handleShow}>
            New Review
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <NewReview />
            </Modal.Body>
          </Modal>
        </div>
      )}
      {reviews &&
        reviews.map((review, index) => (
          <div
            className={index === currentIndex ? "active" : ""}
            onClick={() => setActiveReview(review, index)}
            key={index}
          >
            <Review
              username={review.username}
              date={review.date}
              description={review.description}
              rating={review.rating}
              location={review.location}
              id={review._id}
            />
          </div>
        ))}
    </Container>
  );
};

export default Home;
