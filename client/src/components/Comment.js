import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "../resources/styles/Comment.css";

import CommentService from "../services/comment.service";
import AuthService from "../services/auth.service";

const Comment = ({ id, comments }) => {
  const currentUser = AuthService.getCurrentUser();

  const [form, setForm] = useState("");

  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    async function resolvePromises() {
      var temp = [];
      for (let i = 0; i < comments.length; i++) {
        var temp2 = await CommentService.getComment(comments[i]);
        temp.push(temp2);
      }
      setCommentList(temp);
    }
    resolvePromises();
  }, [comments]);

  const updateForm = (e) => {
    const { value } = e.target;
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
      {commentList &&
        commentList.map((comment, index) => (
          <ul key={index} className="pt-3">
            <li className="comment">
              <div className="commentUsername">
                {comment.data.username}
                <span className="commentDate">
                  {new Date(comment.data.date).toLocaleString()}
                </span>
                <span className="modify-buttons">
                  {comment.data.username === currentUser.username && (
                    <Button
                      variant="outline-danger"
                      style={{ borderStyle: "none" }}
                      onClick={() =>
                        CommentService.deleteComment(id, comment.data._id)
                      }
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  )}
                </span>
              </div>
              <div>{comment.data.message}</div>
            </li>
          </ul>
        ))}
    </div>
  );
};

export default Comment;
