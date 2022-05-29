import React from "react";
import { Container } from "react-bootstrap";

import ProfileInfo from "./ProfileInfo.js";

const Profile = () => {
  return (
    <Container className="pt-3">
      <ProfileInfo />
    </Container>
  );
};

export default Profile;
