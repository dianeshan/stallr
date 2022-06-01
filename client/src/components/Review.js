import { Card, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import toiletpic from "../resources/images/temp-toilet.jpeg";

import ReviewService from "../services/review.service";
import AuthService from "../services/auth.service";



const Review = ({ username, date, location, description, rating, id}) => {

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const deleteReview = () => {
    
    ReviewService.deleteReview(id)//need to put an id here
      .then(response => {
        console.log(response.data);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Card className="w-50">
      <Card.Img variant="top" src={toiletpic} />
      <Card.Body>
        {currentUser?(
          currentUser.username == username?(
            <Button id="deleteReviewButton" onClick={deleteReview}>Delete</Button>
          ):(
            <></>
          )
          )
          :(
          <></>
        )
      }
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
//need to check if you share the same username as the post's username. If so, then a delete option will be available.

export default Review;
