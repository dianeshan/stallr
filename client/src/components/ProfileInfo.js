import React, { useState } from "react";
import { Container, Row, Col, Nav, Button, Modal } from "react-bootstrap";

import AuthService from "../services/auth.service";
import Pfp from "./Pfp";
import EditProfile from "./EditProfile";
import UserService from "../services/user.service";

function ProfileInfo() {
  var currentUser = AuthService.getCurrentUser();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

        var pathname = pfp;
        var nameOfFile = pathname.replace(/^C:\\fakepath\\/, "");
        nameOfFile = __dirname + "/uploads/" + nameOfFile;
        var type = "image/png";

        if (nameOfFile.toLowerCase().endsWith(".jpg")) {
          type = "image/jpg";
        } else if (nameOfFile.toLowerCase().endsWith(".jpeg")) {
          type = "image/jpeg";
        }

        var reader = new FileReader();
        var url = reader.readAsDataURL(nameOfFile);

        updateUser.pfp.data = url;
        updateUser.pfp.contentType = type;
        console.log("hi");
        console.log(pfp);
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile onSubmit={handleSubmit} handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProfileInfo;
