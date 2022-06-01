import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import CommentService from "../services/comment.service";
import AuthService from "../services/auth.service";

const Comment = ({id, comments}) => {
    const currentUser = AuthService.getCurrentUser();

    const [form, setForm] = useState("");

    const updateForm = (e) => {
        const {value} = e.target
        setForm(value);
    };

    const submitComment = () => {
        var data = {
            id: id,
            username: currentUser.username,
            message: form,
        };

        CommentService.createComment(data)
            .then((response) => {
                setForm("");
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Leave a comment</Form.Label>
                    <Form.Control 
                        name="comment"
                        id="comment"
                        value={form}
                        onChange={updateForm}
                        type="text"
                        placeholder="Leave a comment"
                    />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={submitComment}>
                Submit
            </Button>
            { comments && comments.map((comment, index) => (
                <ul>
                    <li className="comment" key={index}>
                        <p>{comment.username}</p>
                        <p>{comment.message}</p>
                        <p>{comment.date}</p>
                    </li>
                </ul>
            ))}
        </div>
    );
}

export default Comment;