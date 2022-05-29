import { Container, Row, Col, Nav } from "react-bootstrap";

import AuthService from "../services/auth.service";
import Pfp from "./Pfp";

function ProfileInfo() {
  const currentUser = AuthService.getCurrentUser();
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
            <Nav.Link href="Edit-Profile">Edit Profile</Nav.Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileInfo;
