import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";

import NavBar from "../components/NavBar";
import Review from "../components/Review";
import NewReview from "../components/NewReview";
import "./Home.css";

function Home() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <NavBar />
            <Container className="pt-4">
                <div className="centered">
                    <Button variant="info" onClick={handleShow}>New Post</Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>New Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body> 
                            <NewReview />
                        </Modal.Body>
                        {/* <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Post
                        </Button>
                        </Modal.Footer> */}
                    </Modal>
                </div>
                <div className="centered pt-3">
                    <Review />
                </div>
            </Container>
        </div> 
        
    )
}

export default Home;