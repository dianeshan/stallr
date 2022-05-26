import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";

// import UserService from "../services/user.service";
import Review from "./Review";
import NewReview from "./NewReview";

const Home = () => {
    // const [content, setContent] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // useEffect(() => {
    //     UserService.getPublicContent().then(
    //     (response) => {
    //         setContent(response.data);
    //     },
    //     (error) => {
    //         const _content =
    //         (error.response && error.response.data) ||
    //         error.message ||
    //         error.toString();
    //         setContent(_content);
    //     }
    //     );
    // }, []);
    return (
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
                </Modal>
            </div>
            <div className="centered">
                <Review />
            </div>
        </Container>
    );
};

export default Home;