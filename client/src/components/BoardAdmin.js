import React, { useState, useEffect } from "react";
import { Container, Card, Figure } from "react-bootstrap";
import { Buffer } from "buffer";

import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveUsers();
  }, []);

  const retrieveUsers = () => {
    UserService.getAll()
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveUser = (user, index) => {
    setCurrentIndex(index);
  };

  return (
    <Container className="pt-4">
      <h3>Admin Board</h3>
      {users &&
        users.map((user, index) => (
          <Card
            className={"w-50 " + (index === currentIndex ? "active" : "")}
            onClick={() => setActiveUser(user, index)}
            key={index}
          >
            <Card.Title>{user.username}</Card.Title>
            <Card.Text>{user.bio}</Card.Text>
            <Figure>
              <Figure.Image
                width={150}
                height={150}
                src={`data:${user.pfp.contentType};base64, ${Buffer.from(
                  user.pfp.data
                ).toString("base64")}`}
                roundedCircle={true}
                alt="profile"
              />
            </Figure>
          </Card>
        ))}
    </Container>
  );
};

export default BoardAdmin;
