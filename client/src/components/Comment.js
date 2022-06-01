import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

import CommentService from "../services/comment.service";
import AuthService from "../services/auth.service";

const Comment = ({id, comments}) => {
    const currentUser = AuthService.getCurrentUser();

    const [form, setForm] = useState("");

    const [commentList, setCommentList] = useState([]);

    useEffect(() => {
        async function resolvePromises() {
            var temp = [];
            for (let i = 0; i < comments.length; i++) {
                var temp2 = await CommentService.getComment(comments[i])
                temp.push(temp2);
            }
            setCommentList(temp);
        }
        resolvePromises();
    }, [comments])

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
            { commentList && commentList.map((comment, index) => (
                <ul key={index}>
                    <li className="comment">
                        {console.log(comment)}
                        <p>{comment.data.username}</p>
                        <p>{comment.data.message}</p>
                        <p>{new Date(comment.data.date).toLocaleString()}</p>
                    </li>
                    { (comment.data.username === currentUser.username) && <Button variant="danger" onClick={() => CommentService.deleteComment(id, comment.data._id)}>Delete Comment</Button> }
                </ul>
            ))}
        </div>
    );
}

export default Comment;