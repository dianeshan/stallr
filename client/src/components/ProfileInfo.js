import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Figure } from "react-bootstrap";
import { Buffer } from "buffer";

import AuthService from "../services/auth.service";
import EditProfile from "./EditProfile";
import UserService from "../services/user.service";

function ProfileInfo() {
  var currentUser = AuthService.getCurrentUser();

  const [friendsList, setFriendsList] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseFriends = () => setShowFriends(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleShowFriends = () => setShowFriends(true);

  useEffect(() => {
    async function resolvePromises() {
      var temp = [];
      var tempUser = await UserService.getUser(currentUser.id);
      for (let i = 0; i < tempUser.data.friends.length; i++) {
        var temp2 = await UserService.getUser(tempUser.data.friends[i]);
        temp.push(temp2);
      }
      setFriendsList(temp);
    }
    resolvePromises();
  }, [currentUser]);

  useEffect(() => {
    async function resolvePromises() {
      var tempUser = await UserService.getUser(currentUser.id);
      var updateUser = JSON.parse(localStorage.getItem("user"));
      updateUser.pfp.data = Buffer.from(tempUser.data.pfp.data).toString(
        "base64"
      );
      updateUser.pfp.contentType = tempUser.data.pfp.contentType;
      localStorage.setItem("user", JSON.stringify(updateUser));
    }
    resolvePromises();
  }, [currentUser]);

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
      <Container style={{ marginTop: 100 }}>
        <Row style={{ marginBottom: 10, fontSize: 20 }}>
          <Col>{currentUser.username}</Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className="align-left" md={{ span: 5, offset: 2 }}>
            {currentUser.bio}
          </Col>
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
        </Row>
        <Row className="align-middle">
          <Col md={{ span: 1, offset: 7 }}>
            <Button variant="primary" onClick={handleShowFriends}>
              Friends
            </Button>
          </Col>
          <Col md={1}>
            <Button variant="primary" onClick={handleShowEdit}>
              Edit Profile
            </Button>
          </Col>
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
                <Row>
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
                  <Col>{friend.data.username}</Col>
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
