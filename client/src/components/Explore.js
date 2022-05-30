import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Explore = () => {
  const you = AuthService.getCurrentUser();

  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onChangeSearchUsername = (e) => {
    const searchUsername = e.target.value;
    setSearchUsername(searchUsername);
  };

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

  // const retrieveFriends = () => {
  //   UserService.getAllFriends()
  //     .then((response) => {
  //       setUsers(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const refreshList = () => {
    retrieveUsers();
    setCurrentUser(null);
    setCurrentIndex(-1);
  };

  const setActiveUser = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
  };

  const addFriend = () => {
    UserService.addfriend(you.id, currentUser)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //   const findByUsername = () => {
  //     TutorialDataService.findByTitle(searchTitle)
  //       .then((response) => {
  //         setTutorials(response.data);
  //         console.log(response.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };

  return (
    <Container>
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchUsername}
              onChange={onChangeSearchUsername}
            />
            {/* <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByUsername}
            >
              Search
            </button>
          </div> */}
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users</h4>

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

          {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
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

              {/* <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Edit
              </Link> */}
              <Button onClick={addFriend}>Add Friend</Button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a user...</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Explore;
