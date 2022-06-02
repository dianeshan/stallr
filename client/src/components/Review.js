import { Card, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Buffer } from "buffer";
import "../resources/styles/Review.css"

import Comment from "./Comment";
import ReviewService from "../services/review.service";
import AuthService from "../services/auth.service";
import EditReview from "./EditReview";

const Review = ({
  id,
  username,
  date,
  location,
  description,
  rating,
  comments,
  images,
}) => {
  const [toggle, setToggle] = useState(false);

  const updateToggle = () => {
    setToggle(!toggle);
  };

  const currentUser = AuthService.getCurrentUser();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteReview = () => {
    ReviewService.deleteReview(id)
      .then((response) => {
        console.log(response.data);
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card className="w-50">
      <Card.Text class="locationName">{location}</Card.Text>
      <Card.Text id="ratingInfo">Rating: {rating}/10</Card.Text>
      <Card.Img
        variant="top"
        src={`data:${images.contentType};base64, ${Buffer.from(
          images.data
        ).toString("base64")}`}
      />
      <Card.Body>
        {currentUser ? (
          currentUser.username === username ? (
            <div className="reviewButtons">
              <Button
                id="deleteReviewButton"
                variant="danger"
                type="submit"
                onClick={deleteReview}
              >
                Delete
              </Button>
              <Button
                id="updateReviewButton"
                variant="info"
                onClick={handleShow}
              >
                Update
              </Button>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <EditReview
                    id={id}
                    location={location}
                    description={description}
                    rating={rating}
                    images={images}
                  />
                </Modal.Body>
              </Modal>
            </div>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        
        <Card.Text>{description}</Card.Text>
        <Card.Text class = "card-username">{username}</Card.Text>
        <Card.Text class = "dateInfo">{new Date(date).toLocaleString()}</Card.Text>
        
        
        <Button variant="light" onClick={updateToggle} id="commentButton">
          Comments
        </Button>
        {toggle && <Comment id={id} comments={comments} />}
      </Card.Body>
    </Card>
  );
};

export default Review;
