import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Buffer } from "buffer";

import toiletpic from "../resources/images/temp-toilet.jpeg";

import Comment from "./Comment";

const Review = ({
  id,
  username,
  date,
  location,
  description,
  rating,
  comments,
  images,
}) => {
  const [toggle, setToggle] = useState(false);

  const updateToggle = () => {
    setToggle(!toggle);
  };

  return (
    <Card className="w-50">
      <Card.Img
        variant="top"
        src={`data:${images.contentType};base64, ${Buffer.from(
          images.data
        ).toString("base64")}`}
      />
      <Card.Body>
        <Card.Text>{username}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <Card.Text>{new Date(date).toLocaleString()}</Card.Text>
        <Card.Text>Rating: {rating}/10</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Button variant="light" onClick={updateToggle}>
          Comments
        </Button>
        {toggle && <Comment id={id} comments={comments} />}
      </Card.Body>
    </Card>
  );
};

export default Review;
