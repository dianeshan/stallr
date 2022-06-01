import React, { useState, useEffect, useRef } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import WAVES from "vanta/dist/vanta.waves.min";
import * as THREE from "three";

import ReviewService from "../services/review.service";
import AuthService from "../services/auth.service";
import Review from "./Review";
import NewReview from "./NewReview";

const Home = () => {
  const [show, setShow] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    retrieveReviews();
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        WAVES({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x838f9b,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

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
    <div ref={myRef}>
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
                id={review._id}
                username={review.username}
                date={review.date}
                description={review.description}
                rating={review.rating}
                location={review.location}
                comments={review.comments}
                images={review.images}
              />
            </div>
          ))}
      </Container>
    </div>
  );
};

export default Home;
