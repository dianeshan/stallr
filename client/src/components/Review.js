import { Card, Button } from "react-bootstrap";
import toiletpic from "../resources/images/temp-toilet.jpeg";

const Review = ({ username, date, location, description, rating }) => {
  return (
    <Card className="w-50">
      <Card.Img variant="top" src={toiletpic} />
      <Card.Body>
        <Card.Text>{username}</Card.Text>
        <Card.Text>{location}</Card.Text>
        <Card.Text>{new Date(date).toLocaleString()}</Card.Text>
        <Card.Text>Rating: {rating}/10</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Button variant="light">Comments</Button>
      </Card.Body>
    </Card>
  );
};

export default Review;
