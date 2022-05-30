import React, { useState } from "react";
import { Container, Row, Col, Nav, Button, Modal, Form } from "react-bootstrap";

import AuthService from "../services/auth.service";
import Pfp from "./Pfp";
//import EditProfile from "./EditProfile";
import UserService from "../services/user.service";

function ProfileInfo() {
  // const currentUser = AuthService.getCurrentUser();

  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [show, setShow] = useState(false);
  // const [bio, setBio] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  const updateUser = () => {
    // var user = {
    //   username: currentUser.username,
    //   email: currentUser.email,
    //   password: currentUser.password,
    //   roles: currentUser.roles,
    //   friends: currentUser.friends,
    //   bio: bio,
    //   pfp: currentUser.pfp,
    // };

    UserService.update(currentUser.id, currentUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <Container style={{ marginTop: 100 }}>
        <Row style={{ marginBottom: 10, fontSize: 20 }}>
          <Col>
            <h3>{currentUser.username}</h3>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col className="align-left" md={{ span: 5, offset: 2 }}>
            {currentUser.bio}
          </Col>
          <Col md="auto">
            <Pfp style={{ marginTop: 50 }} />
          </Col>
        </Row>
        <Row className="align-middle">
          <Col md={{ span: 1, offset: 7 }}>
            <Nav.Link href="Friends">Friends</Nav.Link>
          </Col>
          <Col md={1}>
            <Button variant="primary" onClick={handleShow}>
              Edit Profile
            </Button>
          </Col>
        </Row>
      </Container>

      <Form>
        <Form.Group>
          <Form.Label>Bio</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter bio"
            value={currentUser.bio}
            name="bio"
            onChange={handleInputChange}
          />
          {console.log(currentUser.bio)}
        </Form.Group>
        <p></p>
        <Button type="submit" variant="primary" onClick={updateUser}>
          Submit
        </Button>
      </Form>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile onSubmit={handleSubmit} handleClose={handleClose} />
          <Form>
            <Form.Group>
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter bio"
                value={currentUser.bio}
                name="bio"
                onChange={handleInputChange}
              />
              {console.log(currentUser.bio)}
            </Form.Group>
            <p></p>
          </Form>
          <Button
            type="submit"
            variant="primary"
            onClick={(e) => {
              updateUser();
              handleClose();
            }}
          >
            Submit
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}

export default ProfileInfo;
