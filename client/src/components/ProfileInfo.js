import { Container, Row, Col, Nav } from "react-bootstrap";

import Pfp from "./Pfp"

function ProfileInfo() {

    return (
        <div>
            <Container style={{ marginTop: 100 }}>
                <Row style={{marginBottom: 10, fontSize: 20}}>
                    <Col>TheHyperLeafeon</Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col className="align-left" md={{ span: 5, offset: 2}}>
                        According to all known laws of aviation, there is no way a bee should be able to fly.
                        Its wings are too small to get its fat little body off the ground.
                        The bee, of course, flies anyway because bees don't care what humans think is impossible.
                        Yellow, black. Yellow, black. Yellow, black. Yellow, black.
                        Ooh, black and yellow!
                        Let's shake it up a little. </Col>
                    <Col md="auto"><Pfp style={{ marginTop: 50 }}/></Col>
                </Row>
                <Row className="align-middle">
                    <Col md={{ span: 1, offset: 7 }}><Nav.Link href="Friends">Friends</Nav.Link></Col>
                    <Col md={1}><Nav.Link href="Edit-Profile">Edit Profile</Nav.Link></Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileInfo;