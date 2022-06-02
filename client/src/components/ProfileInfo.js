import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Figure } from "react-bootstrap";
import { Buffer } from "buffer";

import "../resources/styles/ProfileInfo.css";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import ReviewService from "../services/review.service";
import EditProfile from "./EditProfile";
import Review from "./Review";

function ProfileInfo() {
  const currentUser = AuthService.getCurrentUser();

  const [friendsList, setFriendsList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseFriends = () => setShowFriends(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowFriends = () => setShowFriends(true);

  useEffect(() => {
    async function resolvePromises() {
      var temp = [];
      var tempUser = await UserService.getUser(currentUser.id);
      var updateUser = JSON.parse(localStorage.getItem("user"));
      updateUser.pfp.data = Buffer.from(tempUser.data.pfp.data).toString(
        "base64"
      );
      updateUser.pfp.contentType = tempUser.data.pfp.contentType;
      localStorage.setItem("user", JSON.stringify(updateUser));
      for (let i = 0; i < tempUser.data.friends.length; i++) {
        var temp2 = await UserService.getUser(tempUser.data.friends[i]);
        temp.push(temp2);
      }
      setFriendsList(temp);
    }
    resolvePromises();
  }, [currentUser]);

  useEffect(() => {
    retrieveReviews();
  }, []);

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

  const handleSubmit = (bio, pfp) => {
    console.log(bio);
    console.log(pfp);
    var user = {
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
      roles: currentUser.roles,
      friends: currentUser.friends,
      bio: bio,
      pfp: pfp,
    };

    UserService.update(currentUser.id, user)
      .then((response) => {
        console.log(response.data);
        var updateUser = JSON.parse(localStorage.getItem("user"));
        updateUser.bio = bio;
        localStorage.setItem("user", JSON.stringify(updateUser));
        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container style={{ marginTop: 0 }}>
        <Row style={{ marginBottom: 10, fontSize: 32, textAlign: "left" }}>
          <Col>
            <span style={{ fontWeight: "bold" }}>{currentUser.username}</span>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col md="auto">
            <Figure>
              <Figure.Image
                width={150}
                height={150}
                src={`data:${
                  currentUser.pfp.contentType
                };base64, ${currentUser.pfp.data.toString("base64")}`}
                roundedCircle={true}
                alt="profile"
              />
            </Figure>
          </Col>
          <Col className="align-left" style={{ textAlign: "left" }}>
            {currentUser.bio}
          </Col>
        </Row>
        <div className="align-middle align-items-center">
          <div>
            <Button variant="primary" onClick={handleShowFriends}>
              Friends
            </Button>
          </div>
          <div>
            <Button variant="primary" onClick={handleShowEdit}>
              Edit Profile
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <Row>
          {reviews &&
            reviews.map((review, index) => (
              <Col
                key={index}
                className={
                  review.username === currentUser.username ? "" : "hidden"
                }
                lg={4}
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
                  profile={true}
                />
              </Col>
            ))}
        </Row>
      </Container>

      <Modal show={showFriends} onHide={handleCloseFriends}>
        <Modal.Header closeButton>
          <Modal.Title>Friends List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {friendsList &&
            friendsList.map((friend, index) => (
              <Container key={index}>
                <Row className="align-items-center">
                  <Col lg={3} className="align-left">
                    <Figure>
                      <Figure.Image
                        width={75}
                        height={75}
                        src={`data:${
                          friend.data.pfp.contentType
                        };base64, ${Buffer.from(friend.data.pfp.data).toString(
                          "base64"
                        )}`}
                        roundedCircle={true}
                        alt="profile"
                      />
                    </Figure>
                  </Col>
                  <Col>
                    <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                      {friend.data.username}
                    </span>
                  </Col>
                </Row>
              </Container>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFriends}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile onSubmit={handleSubmit} handleClose={handleCloseEdit} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileInfo;
