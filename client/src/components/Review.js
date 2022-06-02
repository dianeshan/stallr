import { Card, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Buffer } from "buffer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

import "../resources/styles/Review.css";

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
      <Card.Text className="locationName">{location} </Card.Text>
      <Card.Text id="ratingInfo">Rating: {rating}/10 </Card.Text>
      <Card.Img
        variant="top"
        src={`data:${images.contentType};base64, ${Buffer.from(
          images.data
        ).toString("base64")}`}
      />
      <Card.Body>
        <div>
          <Card.Text className="card-username">
            {username}{" "}
            <span className="dateInfo">{new Date(date).toLocaleString()}</span>
            {currentUser ? (
              currentUser.username === username ? (
                <div className="modify-buttons">
                  <Button
                    type="submit"
                    variant="outline-danger"
                    style={{ borderStyle: "none" }}
                  >
                    <FontAwesomeIcon icon={faXmark} onClick={deleteReview} />
                  </Button>
                  <Button
                    variant="outline-info"
                    style={{ borderStyle: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={handleShow}
                    />
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
          </Card.Text>
        </div>
        <Card.Text>{description}</Card.Text>

        <Button variant="light" onClick={updateToggle} id="commentButton">
          Comments
        </Button>
        {toggle && <Comment id={id} comments={comments} />}
      </Card.Body>
    </Card>
  );
};

export default Review;
