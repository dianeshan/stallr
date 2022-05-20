import React from "react";
import { Container } from "react-bootstrap";

import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  return (
    <Container className="pt-3">
        <h1>{currentUser.username}</h1>
    </Container>
  );
};

export default Profile;