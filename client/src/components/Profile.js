import React from "react";
import { Container, Button, Image } from "react-bootstrap";

import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <Container className="pt-3">
      <h1>{currentUser.username}</h1>
      <h2>{currentUser.bio}</h2>
      <Image
        src={`data:${currentUser.pfp.contentType};base64, ${currentUser.pfp.data}`}
        alt="profile"
      />
      <Button>Edit Profile Picture</Button>
    </Container>
  );
};

export default Profile;
