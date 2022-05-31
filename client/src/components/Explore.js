import React, { useState, useEffect } from "react";
import { Container, Button, Card, Figure, Row } from "react-bootstrap";
import { Buffer } from "buffer";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Explore = () => {
  const yourself = AuthService.getCurrentUser();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
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
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const addFriend = () => {
    UserService.addfriend(yourself.id, currentUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <Row className="list row">
        <div className="col-md-6">
          <h4 className="pt-3">Users</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveUser(user, index)}
                  key={index}
                >
                  {user.username}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <Card>
                <Card.Title>User</Card.Title>
                <div className="pt-2">
                  <Figure>
                    <Figure.Image
                      width={150}
                      height={150}
                      src={`data:${
                        currentUser.pfp.contentType
                      };base64, ${Buffer.from(currentUser.pfp.data).toString(
                        "base64"
                      )}`}
                      roundedCircle={true}
                      alt="profile"
                    />
                  </Figure>
                </div>
                <div>
                  <label>
                    <strong>Username:</strong>
                  </label>{" "}
                  {currentUser.username}
                </div>
                <div>
                  <label>
                    <strong>Bio:</strong>
                  </label>{" "}
                  {currentUser.bio}
                </div>
              </Card>
              <Button onClick={addFriend}>Add Friend</Button>
            </div>
          ) : (
            <div>
              <br />
              <p>Click on a user</p>
            </div>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default Explore;
